import { FaTag } from "react-icons/fa/";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { graphql } from "gatsby";
import Seo from "../components/Seo";
import { ThemeContext } from "../layouts";
import Article from "../components/Article";
import Headline from "../components/Article/Headline";
import GCMS_List from "../components/List/List_GCMS";
import CategoryHero from "../components/Hero/Category_Hero";
import GCMS_Blog from "../components/Blog/Blog_GCMS";

class CategoryTemplate extends Component {
  separator = React.createRef();

  scrollToContent = e => {
    this.separator.current.scrollIntoView({ block: "start", behavior: "smooth" });
  };

  render() {
    const {
      pageContext: { category },
      data: {
        // posts: { edges: localRemarks = [] },
        gcms: { articles: graphCMSRemarks = [], featured },
  
        bgDesktop: {
          resize: { src: desktop }
        },
        bgTablet: {
          resize: { src: tablet }
        },
        bgMobile: {
          resize: { src: mobile }
        },
        site: {
          siteMetadata: { facebook }
        }
      }
    } = this.props;

    const totalCount1 = graphCMSRemarks.length
    console.log("graphCMSRemarks : ", graphCMSRemarks)

    const backgrounds = {
      desktop,
      tablet,
      mobile
    };

    return (
      <React.Fragment>
        <ThemeContext.Consumer>
          {theme => (
            <CategoryHero category={category} scrollToContent={this.scrollToContent} backgrounds={backgrounds} theme={theme} />
          )}
        </ThemeContext.Consumer>
        {/* <ThemeContext.Consumer>
          {theme => (
            <Article theme={theme}>
              <header>
                <Headline theme={theme}>
                  {category} <p className="meta"> <strong>{totalCount1}</strong> </p>
                </Headline>
                <GCMS_List articles={graphCMSRemarks} theme={theme} />
              </header>
            </Article>
          )}
        </ThemeContext.Consumer> */}
        <ThemeContext.Consumer>
          {theme => 
            <React.Fragment>
              <GCMS_Blog posts={graphCMSRemarks} featured={graphCMSRemarks} theme={theme} />              
            </React.Fragment>
          }
        </ThemeContext.Consumer>
        <Seo facebook={facebook} />
      </React.Fragment>
    );    
  }
};

CategoryTemplate.propTypes = {
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.object.isRequired
};

export default CategoryTemplate;

// eslint-disable-next-line no-undef
/**
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [fields___prefix], order: DESC }
      filter: { frontmatter: { category: { eq: $category } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          excerpt
          timeToRead
          frontmatter {
            title
            category
          }
        }
      }
    }
 */
export const categoryQuery = graphql`
  query PostsByCategory($category: GraphCMS_ArticleCategory) {
    gcms {
      articles(where: {category: $category}) {
        id
        title
        slug
        category
        content
        author
        coverImage {
          url
        }
        createdAt
      }
      featured: articles(where: {category: $category, blocked_not: true}) {
        id
        title
        slug
        category
        content
        author
        coverImage {
          url
        }
        createdAt
      }
    }
    site {
      siteMetadata {
        facebook {
          appId
        }
      }
    }
    bgDesktop: imageSharp(fluid: { originalName: { regex: "/blog-background/" } }) {
      resize(width: 1200, quality: 90, cropFocus: CENTER) {
        src
      }
    }
    bgTablet: imageSharp(fluid: { originalName: { regex: "/blog-background/" } }) {
      resize(width: 800, height: 1100, quality: 90, cropFocus: CENTER) {
        src
      }
    }
    bgMobile: imageSharp(fluid: { originalName: { regex: "/blog-background/" } }) {
      resize(width: 450, height: 850, quality: 90, cropFocus: CENTER) {
        src
      }
    }
  }
`;
