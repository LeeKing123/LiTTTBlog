import React, { Component } from "react";
import PropTypes from "prop-types";
import Slider from "react-slick";
import "prismjs/themes/prism-okaidia.css";

import asyncComponent from "../AsyncComponent";
import Headline from "../Article/Headline";
import Meta from "./Meta";
import Author from "./Author";
import Comments from "./Comments";
import NextPrev from "./NextPrev";
import GCMS_Bodytext from "../Article/Bodytext_GCMS";
import excerptHtml from 'excerpt-html';
import { withStyles } from '@material-ui/core/styles';


const GCMS_Share = asyncComponent(() =>
  import("./Share_GCMS")
    .then(module => {
      return module.default;
    })
    .catch(error => {})
);


const styles = theme => ({
  media: {
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      margin: "0px 5% 10px 5%",
      width: '90%'
    },
  }
});
class GCMS_Post extends Component {
  render() {
    const {
      post,
      post: {
        content, 
        slug,
        title,
        author,
        category,
        media,
        createdAt
      },
      authornote,
      facebook,
      next: nextPost,
      prev: prevPost,
      theme,
      classes
    } = this.props;
    const excerpt = excerptHtml(content, { pruneLength: 300 })

    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      dots: true,
    };
    
    return (
      <React.Fragment>
        {/* <header>
          <Headline title={title} theme={theme} />
          <Meta createdAt={createdAt} author={author} category={category} theme={theme} />
        </header> */}
        {
        media && media.length > 0 &&       
        <div className={classes.media}>
          <Slider {...settings}>
            {
              media.map(m => {
                  switch (m.mimeType) {
                    case "video/mp4":
                      return <div key={m.url} style={{width: "100%"}}>
                                <video className={classes.media} autoPlay loop muted>
                                    <source src={`${m.url}`} type="video/mp4" ></source>
                                </video>                
                                <br/>
                              </div>
                    case "image/gif": 
                      return <div key={m.url}>
                              <img src={`${m.url}`} className={classes.media}></img>
                              <br/>
                            </div>
                    case "image/jpeg":
                      return <div key={m.url}>
                              <img src={`${m.url}`} className={classes.media}></img>                
                              <br/>
                            </div>
                    default:
                      break;
                  }
              })
            }
          </Slider>
        </div>}

        <GCMS_Bodytext html={content} theme={theme} />
        <footer>
          <GCMS_Share post={post} excerpt={excerpt} theme={theme} />
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
  }
};

GCMS_Post.propTypes = {
  post: PropTypes.object.isRequired,
  authornote: PropTypes.string.isRequired,
  facebook: PropTypes.object.isRequired,
  next: PropTypes.object,
  prev: PropTypes.object,
  theme: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles) (GCMS_Post);
