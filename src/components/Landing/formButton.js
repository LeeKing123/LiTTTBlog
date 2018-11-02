import React, { Component } from "react";
import Button from "@material-ui/core/Button";

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    padding: "12px 0px",
    [theme.breakpoints.down('sm')]: {
      padding: '24px 0px 5px 0'
    },
  },
  btnContainer: {
    position: "relative"
  },
  btn: {
    backgroundImage:
      "linear-gradient(to right, rgba(243, 113, 33, 0.75) 0%, rgba(0, 128, 200, 0.75) 100%)",
    borderRadius: 30,
    color: "rgb(0, 128, 200)",
    height: 46,
    letterSpacing: 0,
    margin: "0px, 20px",
    padding: 2,
    minWidth: 230,
    zIndex: 2,
    fontFamily: `Myriad Pro`,
    fontSize: 26,
    textTransform: `none`,
    boxShadow:
      "0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)",
    [theme.breakpoints.down('sm')]: {
        height: 42,
        minWidth: 180,
        fontSize: 21,
    },
  },
  btnSpan: {
    alignItems: "center",
    background: "white",
    borderRadius: 40,
    display: "flex",
    justifyContent: "center",
    transition: "background .5s ease",
    height: 42,
    width: "100%",
    [theme.breakpoints.down('sm')]: {
        height: 38,
    },
  }
});

function ml_webform_success_1088238() {
  var $ = ml_jQuery || jQuery;
  $('.ml-subscribe-form-1088238 .row-success').show();
  $('.ml-subscribe-form-1088238 .row-form').hide();
}

class FormButton extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.btnContainer}>
          <Button type="submit" className={`${classes.btn} primary`}>
            <span className={classes.btnSpan}>Sign Up Now</span>
          </Button>
          <Button disabled style={{display: 'none'}} className={`${classes.btn} loading`}>
              <div className="ml-form-embedSubmitLoad"><div></div><div></div><div></div><div></div></div>
          </Button>
        </div>
      </div>
    );


  }
}

export default withStyles(styles)(FormButton);
