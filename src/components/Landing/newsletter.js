import React, { Component } from "react";
import Form from "./form";
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    borderRadius: 5,
    // backgroundColor: 'rgb(255,255,255, .2)',
    padding: "10px 20px",
    background: "white",
    width: 560,
    boxShadow: "none !important",
    backgroundSize: "100% 100%", // backgroundSize: 'contain'
    height: 150,
    margin: '15px auto',
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      height: 'unset',
      margin: 0
    },
  },
  container: {
    padding: "10px 8px",
    color: "rgb(0, 128, 200)",
    fontSize: 25,
    [theme.breakpoints.down('sm')]: {
      padding: 0,
      fontSize: 24
    },
  },
  form: {
    marginTop: 10
  }
});


class NewSletter extends Component {
  
  test() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <p>Enter your Email and We'll keep you posted!</p>
          <div className={classes.form}>
            <Form />
          </div>

          {/* <div id="mlb2-1088238" className="ml-form-embedContainer ml-subscribe-form ml-subscribe-form-1088238">
            <div className="ml-form-align-center">
              <div className="ml-form-embedWrapper embedForm">
                <div className="ml-form-embedBody ml-form-embedBodyDefault row-form" ref="row-form">
                      <div className="ml-form-embedContent">
                        <h4>Newsletter</h4>
                        <p>Signup for news and special offers!</p>
                      </div>
                      <form className="ml-block-form" action="https://app.mailerlite.com/webforms/submit/d3z3q8" data-code="d3z3q8" method="post" target="_blank">
                        <div aria-label="Please leave the following field empty" className="ml_message_wrapper">
                          <input type="text" name="ml_message" tabIndex="-1" defaultValue="" placeholder="Message" autoComplete="off" title="message"/>
                          <input type="text" name="ml_email" tabIndex="-1" defaultValue="" placeholder="Email" autoComplete="off" title="email"/>
                          <input type="text" name="ml_name" tabIndex="-1" defaultValue="" placeholder="Name" autoComplete="off" title="name"/>
                        </div>
                        <div className="ml-form-formContent">
                          <div className="ml-form-fieldRow ml-last-item">
                            <div className="ml-field-group ml-field-email ml-validate-email ml-validate-required">
                              <input type="email" className="form-control" data-inputmask="" name="fields[email]" defaultValue="" placeholder="Email"/>
                            </div>
                          </div>
                        </div>
                        <input type="hidden" name="ml-submit" defaultValue="1"/>
                        <div className="ml-form-embedSubmit">
                          <button type="submit" className="primary">Subscribe</button>
                          <button disabled="disabled" style={{display: 'none'}} type="button" className="loading">
                              <div className="ml-form-embedSubmitLoad"><div></div><div></div><div></div><div></div></div>
                          </button>
                        </div>
                      </form>
                </div>

                <div className="ml-form-successBody row-success" ref="row-success" style={{display: 'none'}}>
                  <div className="ml-form-successContent">
                    <h4>Thank you!</h4>
                    <p>You have successfully joined our subscriber list.</p>
                  </div>
                </div>
              
              </div>
            </div>
          </div>
          <img src="https://track.mailerlite.com/webforms/o/1088238/d3z3q8?vaa4d608450783acdc64d5338ff94f6d5" 
            width="1" height="1" style={{ maxWidth: 1, maxHeight: 1, visibility: 'hidden', padding: 0, margin: 0, display: 'block' }} border="0"/>
          <script src="https://static.mailerlite.com/js/w/webforms.min.js?vaa4d608450783acdc64d5338ff94f6d5" type="text/javascript"></script> */}

        </div>
      </div>
    );
  }

  render() {
    const { classes } = this.props;
    return (
        <div className={classes.root}>
          <div className={classes.container}>
              <div id="mlb2-1088238" className="ml-form-embedContainer ml-subscribe-form ml-subscribe-form-1088238">
                <div className="ml-form-align-center">
                  <div className="ml-form-embedWrapper embedForm">
                    <div className="ml-form-embedBody ml-form-embedBodyDefault row-form" ref="row-form">
                      <div className="ml-form-embedContent"  style={{width:'103%'}}>
                        <p>Enter your Email and We'll keep you posted!</p>
                      </div>
                      <div className={classes.form}>
                        <Form />
                      </div>
                    </div>
                    <div className="ml-form-successBody row-success" ref="row-success" style={{display: 'none'}}>
                      <div className="ml-form-successContent">
                        <h4>Thank you!</h4>
                        <p>You have successfully joined our subscriber list.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <img src="https://track.mailerlite.com/webforms/o/1088238/d3z3q8?vaa4d608450783acdc64d5338ff94f6d5" 
                width="1" height="1" style={{ maxWidth: 1, maxHeight: 1, visibility: 'hidden', padding: 0, margin: 0, display: 'block' }} border="0"/>
              <script src="https://static.mailerlite.com/js/w/webforms.min.js?vaa4d608450783acdc64d5338ff94f6d5" type="text/javascript"></script>
          </div>
      </div>

    );
  }
}

export default withStyles(styles)(NewSletter);


