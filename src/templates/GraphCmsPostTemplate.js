import PropTypes from "prop-types";
import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
require("prismjs/themes/prism-okaidia.css");

import Seo from "../components/Seo";
import Article from "../components/Article";
import Post from "../components/Post";
import GCMS_Post from "../components/Post/Post_GCMS";

import { ThemeContext } from "../layouts";
import TalkyardCommentsIframe from '@debiki/gatsby-plugin-talkyard';

const GraphCmsPostTemplate = props => {
  const {
    data: {
      // post
      gcms: { article : post },
      authornote: { html: authorNote },
      site: {
        siteMetadata: { facebook }
      }
    },
    pageContext: { next, prev }
  } = props;

  return (
    <React.Fragment>
      <Helmet title={`${post.title}`}>
        <script src="https://just-comments.com/w.js" type="text/javascript" defer="true"></script>
      </Helmet>
      <ThemeContext.Consumer>
        {theme => (
          <Article theme={theme}>
            <GCMS_Post
              post={post}
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
  }
`;
