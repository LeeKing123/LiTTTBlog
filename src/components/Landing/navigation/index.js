import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import { logout } from '../../modules/auth/service'

import { Link } from 'gatsby'
import { Navbar, NavbarToggler } from 'reactstrap';
import MyHeader from './MyHeader'
import logo from "./../../../images/png/logo.png";
import menu from "./../../../images/png/menu.png"

class Navigation extends Component {
  static propTypes = {
    // isAuthenticated: PropTypes.bool.isRequired,
    // user: PropTypes.object.isRequired,
    height: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    bgSubMenu1: PropTypes.string.isRequired,
    bgSubMenu2: PropTypes.string.isRequired,
  }
  
  constructor(props) {
    super(props)
    
    this.state = {
      showNavigation: false,
      showDropdown: false,
    }
  
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
    // this.logout = this.logout.bind(this);
  }
  
  toggleNavbar() {
    this.setState({
      showNavigation: !this.state.showNavigation,
    });
  }
  
  toggleDropdown() {
    this.setState({
      showDropdown: !this.state.showDropdown,
    })
  }
  
  // logout(e) {
  //   e.preventDefault()
  //   this.props.dispatch(logout())
  // }
  
  render() {
    const {bgSubMenu1, bgSubMenu2} = this.props
    return (
      <Navbar className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" style={{height: this.props.height}}>
        {/* littt.net, localhost:9000 */}
        <a href="http://littt.net" className="navbar-brand">
          <img width="125" height="125" src={logo} style={{width: 'auto', height: 50}}/>
        </a>
        <NavbarToggler className="navbar-toggler d-lg-none" onClick={this.toggleNavbar} />
        <MyHeader showNavigation={this.state.showNavigation}                       
          bgSubMenu1={bgSubMenu1}
          bgSubMenu2={bgSubMenu2}/>
        {/* {
          this.props.isAuthenticated
            ? <PrivateHeader user={this.props.user}
                             showNavigation={this.state.showNavigation}
                             toggleDropdown={this.toggleDropdown}
                             showDropdown={this.state.showDropdown}
                             logout={this.logout} />
            : <PublicHeader showNavigation={this.state.showNavigation} />
        } */}
      </Navbar>
    )
  }
}

// const mapStateToProps = state => {
//   return {
//     isAuthenticated: state.auth.isAuthenticated,
//     user: state.user
//   }
// }

export default Navigation
