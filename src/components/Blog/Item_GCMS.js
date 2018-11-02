import { FaArrowRight } from "react-icons/fa/";
import { FaCalendar } from "react-icons/fa/";
import { FaTag } from "react-icons/fa/";
import { FaUser } from "react-icons/fa/";
import Img from "gatsby-image";
import { Link } from "gatsby";
import PropTypes from "prop-types";
import React, { Component } from "react";

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import MarkdownElement from '@material-ui/docs/MarkdownElement';
import Typography from '@material-ui/core/Typography';
import { renderers } from "react-markdown";
import excerptHtml from 'excerpt-html';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    height: '100%',
    color: theme.palette.text.secondary,
  },
  title: {
    fontSize: '2rem',
    fontWeight: 500,
    lineHeight: '2.5rem',
    textTransform: 'uppercase',
    color: 'rgb(55, 55, 56)',  // '#00ace6',
    padding: `0 0 ${theme.spacing.unit * 4}px 0`,
    [theme.breakpoints.down('xs')]: {
      lineHeight: '2rem',
      fontSize: '1.5rem',    
      padding: `0 0 ${theme.spacing.unit * 2}px 0`,
    },
  },
  subTitle: {
    textTransform: 'uppercase',
    color: 'rgb(55, 55, 56)',  // '#00ace6',
    fontSize: '1.6rem',
    fontWeight: 500
  },
  entryDate: {
    marginBottom: 10
  },
  entryComments: {
    marginBottom: 10
  },
  coverContainer: {
    [theme.breakpoints.up('sm')]: {
      padding: `0 ${theme.spacing.unit * 16}px 0 0`
    },
  },
  coverImage: {
    borderRadius: 5,
    width: '90%',
    objectFit: 'cover',
    objectPosition: 'center center',
    boxShadow: '0 8px 20px rgba(0,0,0,.1), 0 10px 44px rgba(0,0,0,.14)',
    transition: 'all .35s cubic-bezier(.4,0,.2,1) 0s',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
    '&:hover': {
      WebkitTransform: 'translateY(-4px)',
      transform: 'translateY(-4px)'
    }
  },

  tagList: {
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center'
    },
  },
  tag: {
    borderRadius: 20,
    margin: 10,
    padding: '2px 10px',
    listStyle: 'none',
    background: 'lightgray',
    textAlign: 'center',
    '&:hover': {
      background: 'rgb(18, 113, 171)',
      color: 'white',
    },
    [theme.breakpoints.down('sm')]: {
      minWidth: 100,
      float: 'left',
      margin: 3
    },
  },
  tagText: {
    color: 'inherit',
    fontSize: '0.75rem',
    textTransform: 'capitalize',
  },
  readBtn: {
      fontSize: 13,
      fontWeight: 500,
      margin: "20px 0",
      letterSpacing: 1,
      textAlign: 'left',
      color: 'rgb(18, 113, 171)',
      textTransform: 'uppercase',
      '&:hover' : {
        textDecoration: 'underline'
      }
  }
});


class GCMS_Item extends Component {
  render() {
    const {
      post: {
        // fields: { slug, prefix },
        slug,
        title,
        category,
        content,
        author,
        coverImage: { url },
        createdAt,
      },
      theme,
      classes
    } = this.props;
    const excerpt = excerptHtml(content, { pruneLength: 300 })

    return (
      <React.Fragment>
        <Grid container className={classes.root}
          spacing={16}
          direction={"row"}
          justify={"center"}>
          <Grid item>
              {/* <Grid item>
                <aside className={classes.paper} style={{ paddingTop: 10, paddingBottom: 10 }}>
                  <div className={classes.entryDate}>
                    <h4 style={{ textTransform: 'uppercase', color: '#00ace6'}}>Posted on</h4>
                    <time dateTime={createdAt}>{new Date(createdAt).toLocaleDateString()}</time>
                  </div>
                  <div className={classes.entryComments}>
                    <h4 style={{ textTransform: 'uppercase', color: '#00ace6'}}>Comments</h4>
                    <span><a href="#comment">No Comments</a></span>
                  </div>
                </aside>
              </Grid> */}
              <div className={classes.paper} style={{ maxWidth: 800, marginBottom: '3rem' }}>
                  <div>
                    <Link to={slug}>
                      <Typography className={classes.title} variant="h3">
                        {title} {/* <FaArrowRight className="arrow" /> */}
                      </Typography>
                      <div className={`${classes.coverContainer} gatsby-image-outer-wrapper`}>
                        <img className={classes.coverImage} src={url} />
                      </div>
                    </Link>{/* <Img fluid={fluid} /> */}

                    <p className="meta">
                      <span>
                        <FaCalendar size={16} /> {new Date(createdAt).toLocaleDateString()}
                      </span>
                      <span>
                        <FaUser size={16} /> {author}
                      </span>
                      {category && (
                        <span>
                          <FaTag size={16} /> {category}
                        </span>
                      )}
                    </p>
                    <MarkdownElement text={excerpt}/>
                    <Link to={slug}>
                      <Typography className={classes.readBtn} variant="button" paragraph={true} color='error' gutterBottom>Read More</Typography>
                    </Link>
                    <ul className={classes.tagList}>
                      <li className={classes.tag}>
                        <span className={classes.tagText} href="" rel="tag">#tag1</span>
                      </li>
                      <li className={classes.tag}>
                        <span className={classes.tagText}  href="" rel="tag">#tag2</span>
                      </li>
                      <li className={classes.tag}>
                        <span className={classes.tagText} href="" rel="tag">#tag3</span>
                      </li>
                    </ul>
                  </div>
                </div>
          </Grid>
        </Grid>        
        <style jsx>{`
          :global(.link) {
            width: 100%;
            color: ${theme.text.color.primary};
          }
  
          .meta {
            display: flex;
            flex-flow: row wrap;
            font-size: 0.8em;
            padding: ${theme.space.m} ${theme.space.s};
            background: transparent;
  
            :global(svg) {
              fill: ${theme.icon.color};
              margin: ${theme.space.inline.xs};
            }
            span {
              align-items: center;
              display: flex;
              text-transform: uppercase;
              margin: ${theme.space.xs} ${theme.space.s} ${theme.space.xs} 0;
            }
          }
  
          p {
            line-height: 1.5;
            padding: 0 ${theme.space.s};
            text-remove-gap: both;
          }
          @below tablet {
            .meta {
              padding: ${`calc(${theme.space.m} * 0.5) ${theme.space.m}`};
            }
          }
          @from-width tablet {  
            .meta {
              padding: ${`calc(${theme.space.m} * 1.5) ${theme.space.m}`};
            }
            p {
              padding: 0 ${theme.space.default};
            }
          }
          @from-width desktop {
            .meta {
              padding: ${`calc(${theme.space.default} * 1) calc(${theme.space.default} * 1)
                calc(${theme.space.default} * 0.5)`};
            }
            p {
              padding: ${`0 calc(${theme.space.default} * 2)`};
            }
          }
        `}</style>
      </React.Fragment>
    );
  }
}

GCMS_Item.propTypes = {
  classes: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles)(GCMS_Item);
