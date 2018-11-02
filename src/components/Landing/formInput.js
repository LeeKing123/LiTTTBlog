import React, { Component } from "react";
import "./formInput.css";

class FormInput extends Component {
  render() {
    return (
      <div className="divs ml-field-group ml-field-email ml-validate-email ml-validate-required">
        <input type="email" data-inputmask="" name="fields[email]" defaultValue="" placeholder="Your email address"/>
      </div>
    );
  }
}

export default FormInput;
