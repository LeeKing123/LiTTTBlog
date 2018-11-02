import PropTypes from "prop-types";
import React, { Component } from "react";
import $ from 'jquery';
import { Link } from "gatsby";

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import GCMS_Item from "./Item_GCMS";

const styles = theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 1000,
    margin: '0 auto',
    width: '100%',
    counterReset: 'showrank',
  },
  pageWrap: { 
    width: 600, 
    margin: '15px auto',
    position: 'relative'
  },
  
  sidebar: { 
    width: 190, 
    position: 'fixed',
    marginLeft: 410
  },

  paper: {
    padding: theme.spacing.unit * 2,
    height: '100%',
    color: theme.palette.text.secondary,
  },

  categoryList: {
  },
  category: {
    borderRadius: '2px',
    margin: '0 20px',
    padding: '5px 3px',
    '&:hover': {
      textDecoration: 'underline'
    }
  },
  categoryText: {
    color: 'inherit',
    fontSize: '0.9rem',
    textTransform: 'uppercase',
  },

  widget: {
    backgroundColor: '#f5f5f5',
    color: '#4d4d4d',
    borderRadius: 8,
    padding: theme.spacing.unit * 2,
    color: theme.palette.text.primary,
  }, 
  popularPosts : {

  },
  widgetTitle: {
    fontSize: 16,
    fontWeight: 700,
    letterSpacing: 1,
    textAlign: 'left',
    color: '#e91e63',
    lineHeight: '32px',
    textTransform: 'uppercase',
    borderBottom: 'solid 1px #eee',
    position: 'relative',
    '&:before' : {
      content: "",
      position: 'absolute',
      left: 0,
      top: -1,
      width: 22,
      height: 1,
      background: '#e51515',
    },   
    '&:after' : {
      content: "\f0da",
      color: '#fff',
      background: '#e51515',
      width: 18,
      height: 18,
      paddingLeft: 2,
      textAlign: 'center',
      lineHeight: 18,
      fontSize: 16,
      position: 'absolute',
      left: 0,
      top: 23,
      borderRadius: '100%',
      boxShadow: '0 0 0 rgba(255, 22, 84, 0.4)',
      animation: 'pulse 2s infinite'
    }
  },
  widgetContent: {
    margin: '15px 0'
  },
  item: {
    margin: '5px 0', 
    display: 'flex', 
    alignItems: 'center',
    transition: 'all .35s cubic-bezier(.4,0,.2,1) 0s',
    '&:hover': {
      WebkitTransform: 'translateY(-4px)',
      transform: 'translateY(-4px)',
      textDecoration: 'underline'
    }
  },
  itemThumbnail: {
    margin: '0 15px 0 0',
    position: 'relative',
    float: 'left',
    '&:before': {
      backgroundColor: '#e91e63',
      color: '#fff',
      position: 'absolute',
      top: '50%',
      left: 0,
      WebkitTransform: 'translateY(-50%) translateX(-50%)',
      transform: 'translateY(-50%) translateX(-50%)',
      counterIncrement: 'showrank',
      content: 'counter(showrank)',
      width: 27,
      height: 27,
      lineHeight: '30px',
      borderRadius: 20,
      textAlign: 'center',
      fontWeight: 700,
      fontSize: 12,
      color: '#fff',
      WebkitBoxShadow: '0 2px 6px rgba(0,0,0,.14), 0 4px 20px rgba(0,0,0,.18)',
      boxShadow: '0 2px 6px rgba(0,0,0,.14), 0 4px 20px rgba(0,0,0,.18)',
    },
  },
  itemThumbnailImage: {
    boxShadow:'0 8px 20px rgba(0,0,0,.1), 0 10px 44px rgba(0,0,0,.14)', 
    borderRadius: 8,
    width: 70,
    height: 70,
  },
  itemTitle: {
    padding: 0,
    lineHeight: '24px',
    float: 'left',
  },
});

class GCMS_Blog extends Component {
  state = {
    direction: 'row',
    justify: 'center',
    alignItems: 'center',
  };

  componentDidMount() {
    // window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    // window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
      if(typeof window !== `undefined` ) {
        let $sidebar   = $("#sidebar")
        let $window    = $(window)
        let offset     = $sidebar.offset()
        let topPadding = 0
        console.log("offset: ", offset)

        console.log("Window scrollTop", $window.scrollTop())
        if ($window.scrollTop() > offset.top) {
            $sidebar.stop().animate({
                marginTop: $window.scrollTop() - offset.top + topPadding
            });
        } else {
            $sidebar.stop().animate({
                marginTop: 0
            });
        }        
      }
  };

  render() {
    const { posts, featured, theme, classes } = this.props;
    console.log(posts);
    return (
      <React.Fragment>
        <main className="main">
          <Grid container className={classes.root} spacing={16}  direction={"row"}  justify={"center"}>
              <Grid item sm={8} xs={12}>
                <article>
                  {posts.map(post => {
                    const { slug } = post;
                    return <GCMS_Item key={slug} post={post} theme={theme} />;
                  })}
                </article>
              </Grid>
              <Grid item sm={4} xs={12} id="sidebar"  ref={el => this.el = el}>
                <div className={classes.paper}>
                  <aside >
                    <div className={`${classes.widget} ${classes.popularPosts}`}>
                      <Typography className={classes.widgetTitle} variant="h4" gutterBottom>
                        Categories
                      </Typography>
                      <div className={`${classes.widgetContent}`}>
                        <ul className={classes.categoryList}>
                          <li className={classes.category}>
                            <Link to={'/category/press-releases/'}>
                              <Typography className={classes.categoryText} variant="button" gutterBottom>Press Releases</Typography>
                            </Link>
                          </li>
                          <li className={classes.category}>
                            <Link to={'/category/dev-blog/'}>
                              <Typography className={classes.categoryText} variant="button" gutterBottom>Dev Blog</Typography>
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <br/>

                    <div className={`${classes.widget} ${classes.popularPosts}`}>
                      <Typography className={classes.widgetTitle} variant="h4" gutterBottom>
                          Featured Posts
                      </Typography>
                      <div className={`${classes.widgetContent} ${classes.popularPost}`}>
                        <ul style={{listStyle: 'none'}}>
                            {featured.map(post => {
                              console.log(post)
                              return <li key={post.id} className={classes.item}>
                                <Link to={post.slug} className={classes.item}>
                                  <div className={`${classes.itemThumbnail}`}>
                                      <img width='70' className={classes.itemThumbnailImage}
                                        src={post.coverImage.url}/>
                                  </div>
                                  <div className={`${classes.itemTitle}`}>
                                      <Typography variant="subtitle1" gutterBottom>{post.title}</Typography>
                                  </div>
                                  <div style={{clear: 'both'}}></div>
                                </Link>   
                              </li>
                            })}
                        </ul>
                      </div>
                    </div>
                  </aside>          
                </div>
              </Grid>
          </Grid>
        </main>
        <style jsx>{`
          ul {
            list-style: none;
            margin: 0 auto;
            padding: ${`calc(${theme.space.default} * 0.5) 0 calc(${theme.space.default} * 0.5)`};
          }
          @above tablet {
            ul {
              max-width: ${theme.text.maxWidth.tablet};
            }
          }
          @above desktop {
            ul {
              max-width: 700; 
            }
          }
        `}</style>
      </React.Fragment>  /*  max-width: ${theme.text.maxWidth.desktop} */
    );    
  }
};

GCMS_Blog.propTypes = {
  classes: PropTypes.object.isRequired,
  posts: PropTypes.array.isRequired,
  featured: PropTypes.array.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles) (GCMS_Blog);
