import { FaTag } from "react-icons/fa/";
import PropTypes from "prop-types";
import React from "react";
import { graphql } from "gatsby";
import Seo from "../components/Seo";
import { ThemeContext } from "../layouts";
import Article from "../components/Article";
import Headline from "../components/Article/Headline";
import GCMS_List from "../components/List/List_GCMS";

const CategoryTemplate = props => {
  const {
    pageContext: { category },
    data: {
      // allMarkdownRemark: { totalCount, edges },
      gcms: { articles },
      site: {
        siteMetadata: { facebook }
      }
    }
  } = props;

  const totalCount1 = articles.length

  return (
    <React.Fragment>
      <ThemeContext.Consumer>
        {theme => (
          <Article theme={theme}>
            <header>
              <Headline theme={theme}>
                <span>Posts in category</span> <FaTag />
                {category}
              </Headline>
              <p className="meta">
                There {totalCount1 > 1 ? "are" : "is"} <strong>{totalCount1}</strong> post{totalCount1 >
                1
                  ? "s"
                  : ""}{" "}
                in the category.
              </p>
              <GCMS_List articles={articles} theme={theme} />
            </header>
          </Article>
        )}
      </ThemeContext.Consumer>

      <Seo facebook={facebook} />
    </React.Fragment>
  );
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
        author
        coverImage {
          url
        }
      }
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
