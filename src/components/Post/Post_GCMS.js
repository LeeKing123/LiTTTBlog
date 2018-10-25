import React from "react";
import PropTypes from "prop-types";
import "prismjs/themes/prism-okaidia.css";

import asyncComponent from "../AsyncComponent";
import Headline from "../Article/Headline";
import Meta from "./Meta";
import Author from "./Author";
import Comments from "./Comments";
import NextPrev from "./NextPrev";
import GCMS_Bodytext from "../Article/Bodytext_GCMS";

const Share = asyncComponent(() =>
  import("./Share")
    .then(module => {
      return module.default;
    })
    .catch(error => {})
);

const GCMS_Post = props => {
  const {
    post,
    post: {
      content, 
      //html
      // fields: { prefix, slug },
      // frontmatter: { title, author, category },
      // prefix,
      slug,
      title,
      author,
      category,
      createdAt
    },
    authornote,
    facebook,
    next: nextPost,
    prev: prevPost,
    theme
  } = props;

  return (
    <React.Fragment>
      <header>
        <Headline title={title} theme={theme} />
        <Meta createdAt={createdAt} author={author} category={category} theme={theme} />
      </header>
      <GCMS_Bodytext html={content} theme={theme} />
      <footer>
        {/* <Share post={post} theme={theme} /> */}
        <Author note={authornote} theme={theme} />
        <NextPrev next={nextPost} prev={prevPost} theme={theme} />
        {/* <Comments slug={slug} facebook={facebook} theme={theme} /> */}
      </footer>
      <div
        className="just-comments"
        data-allowguests="true"
        data-apikey="af37dd6a-43c6-49b6-982e-f3c50800fbbc"
        // style={{ marginBottom: rhythm(1), marginTop: rhythm(-1) }}
      >
      </div>
    </React.Fragment>
  );
};

GCMS_Post.propTypes = {
  post: PropTypes.object.isRequired,
  authornote: PropTypes.string.isRequired,
  facebook: PropTypes.object.isRequired,
  next: PropTypes.object,
  prev: PropTypes.object,
  theme: PropTypes.object.isRequired
};

export default GCMS_Post;
