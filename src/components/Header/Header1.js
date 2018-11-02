import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
// import { FormattedMessage } from 'react-intl';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';

// Import Style
import styles from './Header.css';
import logo from "../../images/png/logo.png";

const customStyles = theme => ({
  root: {
    width: '100%',
    position: 'fixed !important',
    zIndex: '10 !important',
    height: '65px !important',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  menuItem: {
    margin: '0 15px'
  },
  menuLink: { 
    textDecoration: 'none', 
    color: 'white',
    padding: '20px 50px',
    outline: 'none !important',
    fontSize: 23,
    fontWeight: 300,
    textTransform: 'none'
  },
  menuLink1: {
    textDecoration: 'none',
    color: 'black'
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
});

export class Header extends Component {
    state = {
      anchorEl: null,
      mobileMoreAnchorEl: null,
    };

    handleProfileMenuOpen = event => {
      this.setState({ anchorEl: event.currentTarget });
    };

    handleMenuClose = () => {
      this.setState({ anchorEl: null });
      this.handleMobileMenuClose();
    };

    handleMobileMenuOpen = event => {
      this.setState({ mobileMoreAnchorEl: event.currentTarget });
    };

    handleMobileMenuClose = () => {
      this.setState({ mobileMoreAnchorEl: null });
    };

    render() {
      const { anchorEl, mobileMoreAnchorEl } = this.state;
      const { classes } = this.props;
      const isMenuOpen = Boolean(anchorEl);
      const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  
      const renderMenu = (
          <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={this.handleMenuClose}
          >
              <MenuItem onClick={this.handleClose}>Profile</MenuItem>
              <MenuItem onClick={this.handleClose}>My account</MenuItem>
          </Menu>
      );
  
      const renderMobileMenu = (
        <Menu
          anchorEl={mobileMoreAnchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={isMobileMenuOpen}
          onClose={this.handleMobileMenuClose}          
        >
            <MenuItem>
                <Link to="/" className={classes.menuLink1}>Home</Link>
            </MenuItem>
            <MenuItem>
                <Link to="/category" className={classes.menuLink1}>Catgories</Link>
            </MenuItem>
            <MenuItem>
                <Link to="/category/press-releases" className={classes.menuLink1}>Press Releases</Link>
            </MenuItem>
            <MenuItem>
                <Link to="/category/dev-blog" className={classes.menuLink1}>Dev Blog</Link>
            </MenuItem>
        </Menu>
      );
      
      return (
        <div className={classes.root}>
          <AppBar position="static" style={{backgroundColor: 'black'}}>
            <Toolbar style={{height: 80}}>
              <div className={styles['small-logo']}>
                <Link to="/" >
                    <img src={logo} height="50" />
                </Link> 
              </div>
              <div className={classes.grow} />
              <div className={classes.sectionDesktop}>
                <Typography className={classes.menuItem} variant="button" color="inherit" noWrap>
                  <Link to="/" className={classes.menuLink}>Home</Link>
                </Typography>
                <Typography className={classes.menuItem} variant="button" color="inherit" noWrap>
                  <Link to="/category" className={classes.menuLink}>Categories</Link>
                </Typography>
                <Typography className={classes.menuItem} variant="button" color="inherit" noWrap>
                  <Link to="/category/press-releases" className={classes.menuLink}>Press Releases</Link>
                </Typography>
                <Typography className={classes.menuItem} variant="button" color="inherit" noWrap>
                  <Link to="/category/dev-blog" className={classes.menuLink}>Dev Blog</Link>
                </Typography>
              </div>
              <div className={classes.sectionMobile}>
                <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
                  {/* <MoreIcon /> */}asdfas
                </IconButton>
              </div>
            </Toolbar>
          </AppBar>
          {renderMenu}
          {renderMobileMenu}
        </div>
      );
    }
  }

Header.contextTypes = {
  router: PropTypes.object,
};

Header.propTypes = {
//   switchLanguage: PropTypes.func.isRequired,
//   intl: PropTypes.object.isRequired,
};

export default withStyles(customStyles) (Header);
