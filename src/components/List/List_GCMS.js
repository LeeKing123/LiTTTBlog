import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";

const GCMS_List = props => {
  const { articles, theme } = props;

  return (
    <React.Fragment>
      <ul>
        {articles.map(article => {
          const { title, slug } = article;
          return (
            <li key={slug}>
              <Link to={slug}>{title}</Link>
            </li>
          );
        })}
      </ul>

      {/* --- STYLES --- */}
      <style jsx>{`
        ul {
          margin: ${theme.space.stack.m};
          padding: ${theme.space.m};
          list-style: circle;
        }
        li {
          padding: ${theme.space.xs} 0;
          font-size: ${theme.font.size.s};
          line-height: ${theme.font.lineHeight.l};
        }
      `}</style>
    </React.Fragment>
  );
};

GCMS_List.propTypes = {
  articles: PropTypes.array.isRequired,
  theme: PropTypes.object.isRequired
};

export default GCMS_List;
