import React, { Component } from "react";
import FormInput from "./formInput";
import FormButton from "./formButton";
import { withStyles } from '@material-ui/core/styles';
import './mailerlite.css'

const styles = theme => ({
  root: {
    [theme.breakpoints.up('sm')]: {
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
    },
  }
});

class Form extends Component {
  render() {
    const { classes } = this.props;
    return (
        <form className={`${classes.root} ml-block-form`} action="https://app.mailerlite.com/webforms/submit/d3z3q8" data-code="d3z3q8" method="post" target="_blank">
          <div aria-label="Please leave the following field empty" className="ml_message_wrapper">
            <input type="text" name="ml_message" tabIndex="-1" defaultValue="" placeholder="Message" autoComplete="off" title="message"/>
            <input type="text" name="ml_email" tabIndex="-1" defaultValue="" placeholder="Email" autoComplete="off" title="email"/>
            <input type="text" name="ml_name" tabIndex="-1" defaultValue="" placeholder="Name" autoComplete="off" title="name"/>
          </div>
          <div className="ml-form-formContent">
            <div className="ml-form-fieldRow ml-last-item">
              <FormInput/>
              {/* <div className="ml-field-group ml-field-email ml-validate-email ml-validate-required">
                <input type="email" className="form-control" data-inputmask="" name="fields[email]" defaultValue="" placeholder="Email"/>
              </div> */}
            </div>
          </div>
          <input type="hidden" name="ml-submit" defaultValue="1"/>
          <div className="ml-form-embedSubmit">
            <FormButton/>
            {/* <button type="submit" className="primary">Subscribe</button>
            <button disabled="disabled" style={{display: 'none'}} type="button" className="loading">
                <div className="ml-form-embedSubmitLoad"><div></div><div></div><div></div><div></div></div>
            </button> */}
          </div>
        </form>      
    );
  }
}

export default withStyles(styles)(Form);
