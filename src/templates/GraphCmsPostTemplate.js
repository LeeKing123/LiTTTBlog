import PropTypes from "prop-types";
import React, { Component } from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
require("prismjs/themes/prism-okaidia.css");

import Seo from "../components/Seo";
import Article from "../components/Article";
import PostHero from "../components/Hero/Post_Hero";
import Post from "../components/Post";
import GCMS_Post from "../components/Post/Post_GCMS";

import { ThemeContext } from "../layouts";
import TalkyardCommentsIframe from '@debiki/gatsby-plugin-talkyard';

class GraphCmsPostTemplate extends Component {
  
  separator = React.createRef();
  scrollToContent = e => {
    this.separator.current.scrollIntoView({ block: "start", behavior: "smooth" });
  };

  render() {
    const {
      data: {
        gcms: { article : post, featured },
        authornote: { html: authorNote },
        site: {
          siteMetadata: { facebook }
        },
        bgDesktop: {
          resize: { src: desktop }
        },
        bgTablet: {
          resize: { src: tablet }
        },
        bgMobile: {
          resize: { src: mobile }
        },
      },
      pageContext: { next, prev },
    } = this.props;

    console.log("featured :", this.props.data.gcms)
    const backgrounds = {
      desktop,
      tablet,
      mobile
    };

    return (
      <React.Fragment>
        <Helmet title={`${post.title}`}>
          <script src="https://just-comments.com/w.js" type="text/javascript" defer="true"></script>
        </Helmet>
        <ThemeContext.Consumer>
          {theme => (
            <PostHero post={post} scrollToContent={this.scrollToContent} backgrounds={backgrounds} theme={theme} />
          )}
        </ThemeContext.Consumer>
        {/* <hr ref={this.separator} /> */}
        <ThemeContext.Consumer>
          {theme => (
            <Article theme={theme}>
              <GCMS_Post
                post={post}
                featured={featured}
                next={next}
                prev={prev}
                authornote={authorNote}
                facebook={facebook}
                theme={theme}
              />
            </Article>
          )}
        </ThemeContext.Consumer>
        {/* <TalkyardCommentsIframe /> */}
        <Seo data={post} facebook={facebook} />
      </React.Fragment>
    );  
  }

};

GraphCmsPostTemplate.propTypes = {
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.object.isRequired
};

export default GraphCmsPostTemplate;

export const postQuery = graphql`
  query PostBySlug1($slug: String!) {
    gcms {
      article(where: {slug: $slug}) {
        id
        title
        slug
        category
        content
        author
        coverImage {
          url
        }
        media {
          handle
          mimeType
          url
        }
        createdAt
      }
      featured: articles(where: {blocked_not: true}) {
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
    authornote: markdownRemark(fileAbsolutePath: { regex: "/author/" }) {
      id
      html
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
