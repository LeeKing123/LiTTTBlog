import React, { Component } from "react";
import PropTypes from "prop-types";
import Headline from "../Article/Headline";
import Meta from "./../Post/Meta";
import { Link } from "gatsby";
import { FaArrowDown } from "react-icons/fa/";
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  header: {
    padding: theme.spacing.unit * 2,
    height: '100%',
    color: 'white',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    [theme.breakpoints.up('sm')]: {
      width: 900,
    },
  },
  breadcrumb: {
    margin: '70px 0'
  },
  breadcrumbLink: {
    color: 'white', 
    display: 'inline',
    '&:hover': {
      textDecoration: 'underline'
    }
  }
});

class PostHero extends Component {
  render() {
    const { backgrounds, theme, 
        post: {
          slug,
          title,
          author,
          category,
          createdAt
        },
        classes        
    } = this.props;

    return (
      <React.Fragment>
        <section className="hero">
          <div className={classes.header}>
            <div className={classes.breadcrumb}>
              <Link to={'/'} className={classes.breadcrumbLink}>Home</Link> » <Link to={'/category/'} className={classes.breadcrumbLink}>{category}</Link> » {title}
            </div>
            <header>
              <Headline title={title} theme={theme} />
              <Meta createdAt={createdAt} author={author} category={category} theme={theme} />
            </header>
          </div>
        </section>

        {/* --- STYLES --- */}
        <style jsx>{`
          .hero {
            background: ${theme.hero.background};
            background-image: url(${backgrounds.mobile});
            background-repeat: no-repeat;
            background-size: 100%;
            height: 80vh;
          }

          h1, span {
            font-weight: bold !important;
          }

          h1 {
            text-align: center;
            font-size: ${theme.hero.h1.size};
            margin: ${theme.space.stack.l};
            color: ${theme.hero.h1.color};
            line-height: ${theme.hero.h1.lineHeight};
            text-remove-gap: both 0 "Open Sans";
            :global(strong) {
              position: relative;

              &::after,
              &::before {
                content: "›";
                color: ${theme.text.color.attention};
                margin: 0 ${theme.space.xs} 0 0;
                text-shadow: 0 0 ${theme.space.s} ${theme.color.neutral.gray.k};
              }
              &::after {
                content: "‹";
                margin: 0 0 0 ${theme.space.xs};
              }
            }
          }

          button {
            background: ${theme.background.color.brand};
            border: 0;
            border-radius: 50%;
            font-size: ${theme.font.size.m};
            padding: ${theme.space.s} ${theme.space.m};
            cursor: pointer;
            width: ${theme.space.xl};
            height: ${theme.space.xl};

            &:focus {
              outline-style: none;
              background: ${theme.color.brand.primary.active};
            }

            :global(svg) {
              position: relative;
              top: 5px;
              fill: ${theme.color.neutral.white};
              stroke-width: 40;
              stroke: ${theme.color.neutral.white};
              animation-duration: ${theme.time.duration.long};
              animation-name: buttonIconMove;
              animation-iteration-count: infinite;
            }
          }

          @keyframes buttonIconMove {
            0% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-10px);
            }
            100% {
              transform: translateY(0);
            }
          }

          @from-width tablet {
            .hero {
              background-image: url(${backgrounds.tablet});
            }

            h1 {
              max-width: 90%;
              font-size: ${`calc(${theme.hero.h1.size} * 1.3)`};
            }

            button {
              font-size: ${theme.font.size.l};
            }
          }

          @from-width desktop {
            .hero {
              background-image: url(${backgrounds.desktop});
            }

            h1 {
              max-width: 80%;
              font-size: ${`calc(${theme.hero.h1.size} * 1.5)`};
            }

            button {
              font-size: ${theme.font.size.xl};
            }
          }
        `}</style>
      </React.Fragment>
    );    
  }

};

PostHero.propTypes = {
  classes: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  backgrounds: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles) (PostHero);
