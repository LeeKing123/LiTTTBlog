import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import MyButton from './../../../Landing/MyButton';

import { withStyles } from '@material-ui/core/styles';
import MenuList from "@material-ui/core/MenuList";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Grow from "@material-ui/core/Grow";
import Popper from "@material-ui/core/Popper";
import MediaQuery from 'react-responsive';
import Collapse from '@material-ui/core/Collapse';
import Grid from '@material-ui/core/Grid';
import './border-css4.css'
import hr from './../../../../images/landing/icons/hr.png'

const styles = theme => ({
  root: {
    borderRadius: 25,
    padding: '40px 0px 20px 0',
    background: 'none',
    width: 260,
    boxShadow: 'none !important',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'left top',
    backgroundSize: '100% 100%',
  },
  mobileroot: {
    margin: '0 45vw',
    boxShadow: 'none',
    width: 0,
  },
  container: {
    padding: '10px 8px',
  }, 
  topMenu: {
    color: 'white',
    fontSize: 23,
    fontWeight: 300,
    textTransform: 'none',
    padding: '20px 50px',
    [theme.breakpoints.down('md')]: {
      fontSize: 22,
      color: 'black',
      padding: 15,
      width: '100%',
    },
    outline: 'none !important;'
  },
  hrWrapper: {
    textAlign: 'center'
  },
  hr: {
    width: '90%',
    height: 2
  },
});

class ContactMenu extends React.Component {
  state = {
    auth: true,
    open: false,
    mobileopen: false
  };

  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
    {
      this.state.open?
      document.getElementById("border4").removeAttribute("class", "borderBottom4"): document.getElementById("border4").setAttribute("class", "borderBottom4");
    }
    {
      this.state.open && document.getElementById("footer")?
      document.getElementById("footer").removeAttribute("class", "fog"): document.getElementById("footer").setAttribute("class", "fog");
    }
  };

  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }
    this.setState({ open: false });
    document.getElementById("border4").removeAttribute("class", "borderBottom4");
    document.getElementById("footer") && document.getElementById("footer").removeAttribute("class", "fog");
  };

  handleMobileToggle = () => {
    this.setState(state => ({ mobileopen: !state.mobileopen }));
    {
      this.state.mobileopen && document.getElementById("footer")?
      document.getElementById("footer").removeAttribute("class", "fog"): document.getElementById("footer").setAttribute("class", "fog");
    }
  };
  
  handleMobileClose = event => {
    if (this.anchorEl.contains(event.currentTarget)) {
      return;
    }
    this.setState({ mobileopen: false });
    document.getElementById("footer") && document.getElementById("footer").removeAttribute("class", "fog");
  };

  render() {
    const { classes, bg } = this.props;
    const { open, mobileopen} = this.state //except "auth"

    const renderMenu4 = (
      <Fragment>
        <Button
          buttonRef={node => { this.anchorEl = node; }}
          aria-owns={open ? "menu-list-grow" : null}
          aria-haspopup="true"
          onClick={this.handleToggle}
          className={classes.topMenu}
        >
          {this.props.menuTitle}
        </Button>
        <Popper open={open} anchorEl={this.anchorEl} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow  {...TransitionProps}  id="menu-list-grow"
              style={{  transformOrigin: placement === "bottom" ? "left top" : "left bottom" }}
            >
                <Paper className={classes.root}  style={{marginLeft: -140, backgroundImage: `url(${bg})`}}>
                  <ClickAwayListener onClickAway={this.handleClose}>
                      <MenuList className={classes.container}>
                        {
                          this.props.subMenus.map((menu, index) => {
                            return <MyButton key={index} icon={menu.icon} label={menu.label} href={menu.to || ""}/>                  
                          })
                        }
                        <div className={classes.hrWrapper}>
                          <img src={hr} className={classes.hr}/>
                        </div>
                        {
                          this.props.commonMenus.map((menu, index) => {
                            return <MyButton key={index} icon={menu.icon} label={menu.label} href={menu.to || ""}/>
                          })
                        }
                      </MenuList>        
                  </ClickAwayListener>
                </Paper>
            </Grow>
          )}
        </Popper> 
      </Fragment>
    )
    const renderMobileMenu4 = (
      <Fragment>
        <Button
          buttonRef={node => { this.anchorEl = node; }}
          aria-owns={mobileopen ? "menu-list-grow" : null}
          aria-haspopup="true"
          onClick={this.handleMobileToggle}
          className={classes.topMenu}
        >
          {this.props.menuTitle}
        </Button>
        <Collapse in={this.state.mobileopen} timeout="auto" unmountOnExit 
          style={{
            background: "linear-gradient(to left, rgb(169, 46, 145) 0%, rgb(181, 198, 52) 100%) left top / 100% 4px no-repeat rgb(255, 255, 255)",
            boxShadow: 'inset 0px 0px 8px 0px rgba(125,125,125,1)'
          }}>
                <MenuList style={{
                    position: 'relative',
                    left: '20vw', padding: '20px 0'
                }}>
                        <Grid container spacing={8}>
                          {
                            this.props.subMenus.map((menu, index) => {
                              return <MyButton key={index} icon={menu.icon} label={menu.label} href={menu.to || ""}/>                  
                            })
                          }
                          <div>
                            <img src={hr} style={{width: 376, marginLeft: -100}}/>
                          </div>
                          {
                          this.props.commonMenus.map((menu, index) => {
                            return <MyButton key={index} icon={menu.icon} label={menu.label} href={menu.to || ""}/>
                            })
                          }
                        </Grid>
                </MenuList>
          </Collapse>
      </Fragment>
    ) ;

    return (
      <div id="border4">
        <MediaQuery query="(min-width: 992px)">
           {renderMenu4} 
        </MediaQuery> 
        <div style={{ 
                background: "linear-gradient( to left, rgba(169, 46, 145, 1) 0%, rgba(181, 198, 52, 1) 100% ) left bottom #fff no-repeat",
                backgroundSize: "100% 1px"
          }}>   
          < MediaQuery query="(max-width: 991px)">
            {renderMobileMenu4}
          </MediaQuery>
        </div>
      </div>
    );
  }
}

ContactMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  // handleClose: PropTypes.func.isRequired,
  bg: PropTypes.string.isRequired,
  menuTitle: PropTypes.string,
  subMenus: PropTypes.array,
  commonMenus: PropTypes.array  
};

export default withStyles(styles)(ContactMenu);