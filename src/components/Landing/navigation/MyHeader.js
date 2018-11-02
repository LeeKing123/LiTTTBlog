import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Collapse } from 'reactstrap'
import SubMenu1 from './sub/SubMenu1'
import SubMenu2 from './sub/SubMenu2'
import SubMenu3 from './sub/SubMenu3'
import SubMenu4 from './sub/SubMenu4'
import SubMenu5 from './sub/SubMenu5'

// import render from '../articles/listing/components/Article';
import { withStyles } from "@material-ui/core/styles";

import kickstarter from './../../../images/landing/icons/Kickstarter.png'
import support from './../../../images/landing/icons/Support.png'
import mail from './../../../images/landing/icons/Mail.png'
import discord from './../../../images/landing/icons/Discord.png'
import facebook from './../../../images/landing/icons/Facebook.png'
import twitter from './../../../images/landing/icons/Twitter.png'
import device from './../../../images/landing/icons/Device.png'
import device1 from './../../../images/landing/icons/Device1.png'
import release from './../../../images/landing/icons/Release.png'
import blog from './../../../images/landing/icons/Blog.png'


const commonMenus = [
  {icon: kickstarter, label:  (<span>&nbsp;&nbsp;&nbsp;Back LiTTT<sup><sub>TM</sub></sup></span>), to: "https://www.kickstarter.com/projects/littt/1883533304?ref=599314&token=14b04d38"},
  {icon: support, label: (<span>&nbsp;&nbsp;&nbsp;Support Us</span>)}
]

const contactMenus= [
  {icon: mail, label: (<span>&nbsp;&nbsp;&nbsp;Email Us</span>)},
  {icon: discord, label: (<span>&nbsp;&nbsp;&nbsp;Discord Chat</span>)},
  {icon: facebook, label: (<span>&nbsp;&nbsp;&nbsp;Facebook Us</span>)},
  {icon: twitter, label: (<span>&nbsp;&nbsp;&nbsp;Tweet Us</span>)}
]

const preOrderMenus= [
  {icon: device, label: (<span>&nbsp;&nbsp;&nbsp;RGB+W LEDs</span>), to: "https://www.kickstarter.com/projects/littt/1883533304?ref=599314&token=14b04d38" },
  {icon: device, label: (<span>&nbsp;&nbsp;&nbsp;LiTTT<sup><sub>TM</sub></sup> Snap!</span>), to: "https://www.kickstarter.com/projects/littt/1883533304?ref=599314&token=14b04d38" },
  {icon: device1, label: (<span>&nbsp;&nbsp;&nbsp;LiTTT<sup><sub>TM</sub></sup> Hub<sup><sub>TM</sub></sup></span>), to: "https://www.kickstarter.com/projects/littt/1883533304?ref=599314&token=14b04d38" },
]

const newsletterAction = () => { ml_webform_1088090('show') }

const newsPressMenus= [
  {icon: release, label: (<span>&nbsp;&nbsp;&nbsp;Press Releases</span>), to: '/category/press-releases'},  // https://vibrant-boyd-f714f0.netlify.com/category/press-releases
  {icon: blog, label: (<span>&nbsp;&nbsp;&nbsp;Dev Blog</span>), to: '/category/dev-blog' },  // https://vibrant-boyd-f714f0.netlify.com/category/dev-blog
  {icon: mail, label: (<span>&nbsp;&nbsp;&nbsp;Newsletter</span>), onClick: newsletterAction },
]

const stayInTouchMenus= [
  {icon: mail, label: (<span>&nbsp;&nbsp;&nbsp;Email Us</span>)},  
  {icon: discord, label: (<span>&nbsp;&nbsp;&nbsp;Discord Chat</span>)},
  {icon: facebook, label: (<span>&nbsp;&nbsp;&nbsp;Facebook Us</span>)},
  {icon: twitter, label: (<span>&nbsp;&nbsp;&nbsp;Tweet Us</span>)}
]

const productsMenus= [
  {icon: device, label: (<span>&nbsp;&nbsp;&nbsp;RGB+W LEDs</span>), to: "https://www.kickstarter.com/projects/littt/1883533304?ref=599314&token=14b04d38" },
  {icon: device, label: (<span>&nbsp;&nbsp;&nbsp;LiTTT<sup><sub>TM</sub></sup> Snap!</span>), to: "https://www.kickstarter.com/projects/littt/1883533304?ref=599314&token=14b04d38" },
  {icon: device1, label: (<span>&nbsp;&nbsp;&nbsp;LiTTT<sup><sub>TM</sub></sup> Hub<sup><sub>TM</sub></sup></span>), to: "https://www.kickstarter.com/projects/littt/1883533304?ref=599314&token=14b04d38" }
]

const styles = theme => ({
  root: {
    display: "flex"
  },
  paper: {
    marginRight: theme.spacing.unit * 2
  }
});

class MyHeader extends Component {
  render() {
    const { classes, bgSubMenu1, bgSubMenu2} = this.props;
    return  (
      <Collapse className="navbar-collapse navbar-dark" isOpen={this.props.showNavigation}>
          <div className="mobile-menu-bg">
              <ul className="navbar-nav ml-auto">              
                <SubMenu1 menuTitle="Products" subMenus={productsMenus} commonMenus={commonMenus} bg={bgSubMenu1}/>
                <SubMenu2 menuTitle="Stay In Touch" subMenus={stayInTouchMenus} commonMenus={commonMenus} bg={bgSubMenu1}/>
                <SubMenu3 menuTitle="News & Press" subMenus={newsPressMenus} commonMenus={commonMenus} bg={bgSubMenu2}/>
                <SubMenu4 menuTitle="Pre-Order" subMenus={preOrderMenus} commonMenus={commonMenus} bg={bgSubMenu2}/>
                <SubMenu5 menuTitle="Contact Us" subMenus={contactMenus} commonMenus={commonMenus} bg={bgSubMenu2}/>
              </ul>
          </div>
      </Collapse>)
  }
}

MyHeader.displayName = 'MyHeader'
MyHeader.propTypes = {
  showNavigation: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(MyHeader)
