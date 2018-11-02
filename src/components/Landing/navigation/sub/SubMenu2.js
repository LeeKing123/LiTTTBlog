import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import MyButton from './../../../Landing/MyButton';
import NewSletter from './../../../Landing/newsletter';

import { withStyles } from '@material-ui/core/styles';
import MenuList from "@material-ui/core/MenuList";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Grow from "@material-ui/core/Grow";
import Popper from "@material-ui/core/Popper";
// import Popover from "@material-ui/core/Popover";
import Grid from '@material-ui/core/Grid';
import MediaQuery from 'react-responsive';
import Collapse from '@material-ui/core/Collapse';
import './border-css2.css'
import hr from './../../../../images/landing/icons/hr.png'

const styles = theme =>({
  root: {
    borderRadius: 25,
    padding: '40px 0px 20px 0',
    background: 'none',
    width: 650,
    boxShadow: 'none !important',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'left top',
    backgroundSize: '100% 100%',
  },
  mobileroot: {
    // margin: '0 42vw',
    // boxShadow: 'none',
    // width: 0,
  },
  container: {
    padding: '10px 8px'
  },
  buttonWrapper: {
    paddingLeft: '2.5vw !important'
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
  }
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
      document.getElementById("border2").removeAttribute("class", "borderBottom2"): document.getElementById("border2").setAttribute("class", "borderBottom2");
    }
    // {
    //   this.state.open?
    //   document.getElementById("footer").removeAttribute("class", "fog"): document.getElementById("footer").setAttribute("class", "fog");
    // }
  };

  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }
    this.setState({ open: false });
    document.getElementById("border2").removeAttribute("class", "borderBottom2");
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
    const { open, mobileopen } = this.state;

    const renderMenu2 = (
      <Fragment>
        <Button
          buttonRef={node => { this.anchorEl = node; }}
          aria-owns={open ? "menu-list-grow" : null}
          aria-haspopup="true"
          onClick={this.handleToggle}
          className={classes.topMenu}
        >{this.props.menuTitle}</Button>
        <Popper open={open} anchorEl={this.anchorEl} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow  {...TransitionProps} id="menu-list-grow"
              style={{  transformOrigin: placement === "bottom" ? "center top" : "center bottom" }}
            >
                <Paper className={classes.root} style={{marginLeft: 200, backgroundImage: `url(${bg})`}}>
                  <ClickAwayListener onClickAway={this.handleClose}>
                      <MenuList className={classes.container}>
                        <Grid container spacing={8}>
                          <NewSletter />
                        </Grid>
                        <div className={classes.hrWrapper}>
                          <img src={hr} className={classes.hr}/>
                        </div>
                        <Grid container spacing={8}>
                          {
                            this.props.subMenus.map((menu, index) => {
                              return <Grid item key={index} xs={6}>
                                    <div className={classes.buttonWrapper}><MyButton icon={menu.icon} label={menu.label} href={menu.to || ""}/></div>
                                </Grid>
                            })
                          }
                          {
                            this.props.commonMenus.map((menu, index) => {
                              return <Grid item key={index} xs={6}>
                                    <div className={classes.buttonWrapper}><MyButton icon={menu.icon} label={menu.label} href={menu.to || ""}/></div>
                                </Grid>
                    
                            })
                          }
                        </Grid>
                      </MenuList>        
                  </ClickAwayListener>
                </Paper>
            </Grow>
          )}
        </Popper>      
      </Fragment>
    )
    const renderMobileMenu2 = (
      <Fragment>
        <Button
          buttonRef={node => { this.anchorEl = node; }}
          aria-owns={mobileopen ? "menu-list-grow" : null}
          aria-haspopup="true"
          onClick={this.handleMobileToggle}
          className={classes.topMenu}
        >{this.props.menuTitle}</Button>
        <Collapse in={this.state.mobileopen} timeout="auto" unmountOnExit 
          style={{
            background: "linear-gradient(to left, rgb(169, 46, 145) 0%, rgb(181, 198, 52) 100%) left top / 100% 4px no-repeat rgb(255, 255, 255)",
            boxShadow: 'inset 0px 0px 8px 0px rgba(125,125,125,1)'            
          }}>
                <MenuList style={{padding: '10px 8px'}}>
                        <Grid container spacing={8}>
                          <NewSletter />
                        </Grid>
                </MenuList>
          </Collapse>
      </Fragment>
    )
    

    return (<div id="border2">
        <MediaQuery query="(min-width: 992px)">
          {renderMenu2} 
        </MediaQuery>  
        <div style={{ 
              background: "linear-gradient( to left, rgba(169, 46, 145, 1) 0%, rgba(181, 198, 52, 1) 100% ) left bottom #fff no-repeat",
              backgroundSize: "100% 1px"
          }}>  
          < MediaQuery query="(max-width: 991px)">
            {renderMobileMenu2}
          </MediaQuery>
        </div>
      </div>)     
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