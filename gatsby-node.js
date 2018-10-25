//const webpack = require("webpack");
const _ = require("lodash");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const path = require("path");
const Promise = require("bluebird");

const { createFilePath } = require(`gatsby-source-filesystem`);
const { makeSlug } = require("./src/utils/makeSlug")

const initQuery = `{  
  allMarkdownRemark: allMarkdownRemark(
    filter: { fields: { slug: { ne: null } } }
    sort: { fields: [fields___prefix], order: DESC }
    limit: 1000
  ) {
    edges {
      node {
        id
        fields {
          slug
          prefix
          source
        }
        frontmatter {
          title
          category
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
      createdAt
    }
  }
}`

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode });
    const fileNode = getNode(node.parent);
    const source = fileNode.sourceInstanceName;
    const separtorIndex = ~slug.indexOf("--") ? slug.indexOf("--") : 0;
    const shortSlugStart = separtorIndex ? separtorIndex + 2 : 0;

    if (source !== "parts") {
      createNodeField({
        node,
        name: `slug`,
        value: `${separtorIndex ? "/" : ""}${slug.substring(shortSlugStart)}`
      });
    }

    createNodeField({
      node,
      name: `prefix`,
      value: separtorIndex ? slug.substring(1, separtorIndex) : ""
    });

    createNodeField({
      node,
      name: `source`,
      value: source
    });
  }
};

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions;
    const postTemplate = path.resolve("./src/templates/PostTemplate.js");
    const pageTemplate = path.resolve("./src/templates/PageTemplate.js");
    const categoryTemplate = path.resolve("./src/templates/CategoryTemplate.js");
    const gcmsPostTemplate = path.resolve("./src/templates/GraphCmsPostTemplate.js");

    try {
      const { data } = await graphql(initQuery)
      const localRemarks = data.allMarkdownRemark.edges;
      const graphCMSRemarks = data.gcms;
  
      // Create Category Pages
      const categorySet = new Set();
      // localRemarks.forEach(edge => {
      //   const {
      //     node: {
      //       frontmatter: { category }
      //     }
      //   } = edge;
  
      //   if (category && category !== null) {
      //     categorySet.add(category);
      //   }
      // });
      graphCMSRemarks.articles.forEach(article => {
        const { category } = article;
  
        if (category && category !== null) {
          categorySet.add(category);
        }
      });
      const categoryList = Array.from(categorySet);
      categoryList.forEach(category => {
        createPage({
          path: `/category/${_.kebabCase(category)}/`,
          component: categoryTemplate,
          context: {
            category
          }
        });
      });
  
      // Pages
      const pages = localRemarks.filter(item => item.node.fields.source === "pages");
      pages.forEach(({ node }) => {
        const slug = node.fields.slug;
        const source = node.fields.source;
  
        createPage({
          path: slug,
          component: pageTemplate,
          context: {
            slug,
            source
          }
        });
      });
  
      // Create posts
      const posts = localRemarks.filter(item => item.node.fields.source === "posts");
      posts.forEach(({ node }, index) => {
        const slug = node.fields.slug;
        const next = index === 0 ? undefined : posts[index - 1].node;
        const prev = index === posts.length - 1 ? undefined : posts[index + 1].node;
        const source = node.fields.source;
  
        createPage({
          path: slug,
          component: postTemplate,
          context: {
            slug,
            prev,
            next,
            source
          }
        });
      });
  
      // GraphCMS Articles
      const articles = graphCMSRemarks.articles
      console.log("articles : ", articles)
      articles.forEach((article, index) => {
        const slug = article.slug // makeSlug(article);
        const next = index === 0 ? undefined : articles[index - 1];
        const prev = index === articles.length - 1 ? undefined : articles[index + 1];
        const source = "posts";

        createPage({
          path: slug, // makeSlug(article),
          component: gcmsPostTemplate,
          context: {
            slug,
            prev,
            next,
            source
          },
        })
      })      
    } catch(err) {
      if (err) {
        console.log(err);
        return err;
      }
    }  
};

exports.onCreateWebpackConfig = ({ stage, actions }, options) => {
  switch (stage) {
    case `build-javascript`:
      actions.setWebpackConfig({
        plugins: [
          new BundleAnalyzerPlugin({
            analyzerMode: "static",
            reportFilename: "./report/treemap.html",
            openAnalyzer: true,
            logLevel: "error",
            defaultSizes: "gzip"
          })
        ]
      });
  }
};
