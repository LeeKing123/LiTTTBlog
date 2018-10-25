import { FaTag } from "react-icons/fa/";
import PropTypes from "prop-types";
import React from "react";
import { graphql } from "gatsby";
import { ThemeContext } from "../layouts";
import Article from "../components/Article/";
import Headline from "../components/Article/Headline";
import GCMS_List from "../components/List/List_GCMS";
import Seo from "../components/Seo";

const CategoryPage = props => {
  const {
    data: {
      posts: { edges: localPosts },
      gcms: { articles: graphCMSPosts},
      site: {
        siteMetadata: { facebook }
      }
    }
  } = props;

  // Create category list
  const localCategories = {};
  localPosts.forEach(edge => {
    const {
      node: {
        frontmatter: { category }
      }
    } = edge;

    if (category && category != null) {
      if (!localCategories[category]) {
        localCategories[category] = [];
      }
      localCategories[category].push(edge);
    }
  });

  const graphCMSCategories = {};
  graphCMSPosts.forEach(article => {
    const { category:  graphCMSCategory } = article;

    if (graphCMSCategory && graphCMSCategory != null) {
      if (!graphCMSCategories[graphCMSCategory]) {
        graphCMSCategories[graphCMSCategory] = [];
      }
      graphCMSCategories[graphCMSCategory].push(article);
    }
  });

  const categoryList = [];

  for (var key in graphCMSCategories) {
    categoryList.push([key, graphCMSCategories[key]]);
  }

  console.log("localCategories : ", localCategories)
  console.log("graphCMSCategories : ", graphCMSCategories)

  return (
    <React.Fragment>
      <ThemeContext.Consumer>
        {theme => (
          <Article theme={theme}>
            <header>
              <Headline title="Posts by categories" theme={theme} />
            </header>
            {categoryList.map(item => (
              <section key={item[0]}>
                <h2>
                  <FaTag /> {item[0]}
                </h2>
                <GCMS_List articles={item[1]} theme={theme} />
              </section>
            ))}
            {/* --- STYLES --- */}
            <style jsx>{`
              h2 {
                margin: 0 0 0.5em;
              }
              h2 :global(svg) {
                height: 0.8em;
                fill: ${theme.color.brand.primary};
              }
            `}</style>
          </Article>
        )}
      </ThemeContext.Consumer>

      <Seo facebook={facebook} />
    </React.Fragment>
  );
};

CategoryPage.propTypes = {
  data: PropTypes.object.isRequired
};

export default CategoryPage;

//eslint-disable-next-line no-undef
export const query = graphql`
  query PostsQuery {
    posts: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "//posts/[0-9]+.*--/" } }
      sort: { fields: [fields___prefix], order: DESC }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
            prefix
          }
          frontmatter {
            title
            category
            author
            cover {
              children {
                ... on ImageSharp {
                  fluid(maxWidth: 800, maxHeight: 360) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            }
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
    site {
      siteMetadata {
        facebook {
          appId
        }
      }
    }
  }
`;
