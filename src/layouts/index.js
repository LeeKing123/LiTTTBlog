import "typeface-open-sans";
import FontFaceObserver from "fontfaceobserver";
import PropTypes from "prop-types";
import React from "react";
import injectGlobal from "./../shared/globalStyles"
import { graphql, StaticQuery } from "gatsby";

import { getScreenWidth, timeoutThrottlerHandler } from "../utils/helpers";
import Footer from "../components/Footer/";
import Header1 from "../components/Header/Header1";
import Navigation from "../components/Landing/navigation";

export const ThemeContext = React.createContext(null);
export const ScreenWidthContext = React.createContext(0);
export const FontLoadedContext = React.createContext(false);

import themeObjectFromYaml from "../theme/theme.yaml";
import 'bootstrap/dist/css/bootstrap.min.css';

class Layout extends React.Component {
  constructor() {
    super();

    this.state = {
      font400loaded: false,
      font600loaded: false,
      bebasNeueRegularloaded: false,
      screenWidth: 0,
      header1Minimized: false,
      theme: themeObjectFromYaml
    };

    if (typeof window !== `undefined`) {
      this.loadFont("font400", "Open Sans", 400);
      this.loadFont("font600", "Open Sans", 600);
      this.loadFont("BebasNeueRegular", "BebasNeue-webfont");
    }
  }

  timeouts = {};

  componentDidMount() {
    this.setState({ screenWidth: getScreenWidth() });
    if (typeof window !== "undefined") {
      window.addEventListener("resize", this.resizeThrottler, false);
    }
  }

  resizeThrottler = () => {
    return timeoutThrottlerHandler(this.timeouts, "resize", 100, this.resizeHandler);
  };

  resizeHandler = () => {
    this.setState({ screenWidth: getScreenWidth() });
  };

  isHomePage = () => {
    if (this.props.location.pathname === "/") {
      return true;
    }

    return false;
  };

  loadFont = (name, family, weight) => {
    const font = new FontFaceObserver(family, {
      weight: weight
    });

    font.load(null, 10000).then(
      () => {
        console.log(`${name} is available`);
        this.setState({ [`${name}loaded`]: true });
      },
      () => {
        console.log(`${name} is not available`);
      }
    );
  };

  render() {
    return (
      <StaticQuery
        query={graphql`
          query LayoutgQuery {
            pages: allMarkdownRemark(
              filter: { fileAbsolutePath: { regex: "//pages//" }, fields: { prefix: { regex: "/^\\d+$/" } } }
              sort: { fields: [fields___prefix], order: ASC }
            ) {
              edges {
                node {
                  fields {
                    slug
                    prefix 
                  }
                  frontmatter {
                    title
                    menuTitle
                  }
                }
              }
            }
            gcms {
              articles {
                id
                title
                slug
                category
                author
                coverImage {
                  url
                }
              }
            }
            footnote: markdownRemark(fileAbsolutePath: { regex: "/footnote/" }) {
              id
              html
            }
            bgSubMenu1: imageSharp(fluid: { originalName: { regex: "/Panel3@1x.png/" } }) {
              resize(width: 1200, quality: 90, cropFocus: CENTER) {
                src
              }
            }
            bgSubMenu2: imageSharp(fluid: { originalName: { regex: "/Panel1@2x.png/" } }) {
              resize(width: 1200, quality: 90, cropFocus: CENTER) {
                src
              }
            }
            mobileMenu: imageSharp(fluid: { originalName: { regex: "/a.png/" } }) {
              original {
                src
              }
            }
          }
        `}
        
        render={data => {
          const { children } = this.props;
          const {
            footnote: { html: footnoteHTML },
            gcms: { articles: graphCMSPosts},
            pages: { edges: pages }
          } = data;

          console.log("data", data)

          const graphCMSCategories = {};
          graphCMSPosts.forEach(article => {
            const { category } = article;
            if (category && category != null) {
              if (!graphCMSCategories[category]) {
                graphCMSCategories[category] = [];
              }
              graphCMSCategories[category].push(article);
            }
          });
        
          const categoryList = [];        
          for (var key in graphCMSCategories) {
            categoryList.push([key, graphCMSCategories[key]]);
          }
          console.log("categoryList : ", categoryList)

          return (
            <ThemeContext.Provider value={this.state.theme}>
              <FontLoadedContext.Provider value={this.state.font400loaded}>
                <ScreenWidthContext.Provider value={this.state.screenWidth}>
                  <React.Fragment>
                    {/* <Header></Header> <Header1></Header1> */}
                    <Navigation
                      height = {80}
                      bgSubMenu1={data.bgSubMenu1.resize.src}
                      bgSubMenu2={data.bgSubMenu2.resize.src}
                      path={this.props.location.pathname}
                      pages={pages}
                      categories={categoryList}
                      theme={this.state.theme}
                    />
                    <main>{children}</main>
                    <Footer html={footnoteHTML} theme={this.state.theme} />

                    {/* --- STYLES --- */}
                    <style jsx>{`
                      main {
                        min-height: 80vh;
                      }
                    `}</style>
                    <style jsx global>{`
                      html {
                        box-sizing: border-box;
                      }
                      *,
                      *:after,
                      *:before {
                        box-sizing: inherit;
                        margin: 0;
                        padding: 0;
                      }
                      body {
                        font-family: ${this.state.font400loaded
                          ? "'Open Sans', sans-serif;"
                          : "Arial, sans-serif;"};
                      }
                      h1,
                      h2,
                      h3 {
                        font-weight: ${this.state.font600loaded ? 600 : 400};
                        line-height: 1.1;
                        letter-spacing: -0.03em;
                        margin: 0;
                      }
                      h1 {
                        letter-spacing: -0.04em;
                      }
                      p {
                        margin: 0;
                      }
                      strong {
                        font-weight: ${this.state.font600loaded ? 600 : 400};
                      }
                      a {
                        text-decoration: none;
                        color: #666;
                      }
                      main {
                        width: auto;
                        display: block;
                      }
                      .navbar-dark .navbar-toggler-icon {
                        background-image: url(${data.mobileMenu.original.src});/*  -->  to code  */ 
                        width: 50px;
                        height: 40px;
                      }
                    `}</style>
                  </React.Fragment>
                </ScreenWidthContext.Provider>
              </FontLoadedContext.Provider>
            </ThemeContext.Provider>
          );
        }}
      />
    );
  }
}

Layout.propTypes = {
  children: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export default Layout;

//eslint-disable-next-line no-undef
/*
export const postQuery = graphql`
  query LayoutQuery {
    pages: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "//pages//" }, fields: { prefix: { regex: "/^\\d+$/" } } }
      sort: { fields: [fields___prefix], order: ASC }
    ) {
      edges {
        node {
          fields {
            slug
            prefix
          }
          frontmatter {
            title
            menuTitle
          }
        }
      }
    }
    footnote: markdownRemark(fileAbsolutePath: { regex: "/footnote/" }) {
      id
      html
    }
  }
`;

*/
