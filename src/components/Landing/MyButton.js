import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";

import { withStyles } from "@material-ui/core/styles";
import { prototype } from "react-transition-group/TransitionGroup";

const styles = theme => ({
    root: {
        padding: '12px 0px'
    },
    btnContainer: {
        position: 'relative'
    },
    btn: {
        backgroundImage: "linear-gradient(to right, rgba(243, 113, 33, 0.75) 0%, rgba(0, 128, 200, 0.75) 100%)",
        borderRadius: 30,
        color: 'rgb(0, 128, 200)',
        height: 46,
        letterSpacing: 0,
        margin: '0px, 20px',
        padding: 2,
        minWidth: 230,
        zIndex: 2,
        fontFamily: `Myriad Pro`,
        fontSize: 26,
        textTransform: `none`,
        boxShadow: '0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)',
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
    },
    icon: {
        width: 65,
        height: 65,
        position: 'absolute',
        zIndex: 3,
        left: -27,
        top: -10,
        // transform: 'rotate(-10deg)',
        // boxShadow: '0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)'
        [theme.breakpoints.down('sm')]: {
            width: 60,
            height: 60,
            left: -26,
            top: -9
        },
    }
});

function IconLabelButtons({icon, label, href, onClick, classes}) {
  return (
    <div className={classes.root}>
        <div className={classes.btnContainer} >
            {icon && <img className={classes.icon} src={icon}/>}
                {/* target="blank"  */}
                <Button className={classes.btn} href={href} onClick={onClick}>        
                    <span className={classes.btnSpan}>{label}</span>
                </Button>
        </div>        
    </div>
  );
}

IconLabelButtons.propTypes = {
  classes: PropTypes.object.isRequired,
  onClick: PropTypes.function,
  icon: PropTypes.string,
  label: PropTypes.element,
  href: PropTypes.string,
};

export default withStyles(styles)(IconLabelButtons);
