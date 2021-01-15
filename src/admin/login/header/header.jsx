import React, { Component } from "react";
import logo from "../../../assets/images/logo.png";
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="login-header">
        <img src={logo} alt="" />
        管理后台
      </div>
    );
  }
}

export default Header;
