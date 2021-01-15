import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Button, Modal } from "antd";
import "./header.css";
import StoreUtils from "../../utils/StoreUtils";
import { formateDate } from "../../utils/formateDate";
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: 0,
      currentTime: formateDate(Date.now()),
    };
  }
  // 显示弹框
  showModal = () => {
    this.setState({
      visible: 1,
    });
  };
  // 点击取消
  onCancel = () => {
    this.setState({
      visible: 0,
    });
  };
  // 点击确定
  onOk = () => {
    // 关闭弹框
    this.setState({
      visible: 0,
    });
    // 清除store
    StoreUtils.removeUser();
    // 跳转登录
    this.props.history.push("/login");
  };
  // 当前时间处理
  getTime = () => {
    this.intervalId = setInterval(() => {
      const currentTime = formateDate(Date.now());
      this.setState({
        currentTime,
      });
    }, 1000);
  };
  componentDidMount() {
    this.getTime();
  }
  render() {
    const user = StoreUtils.getUser();
    return (
      <div className="admin_header">
        <div className="top">
          <span>{user.username}</span>
          <Button type="primary" onClick={this.showModal}>
            退出登录
          </Button>
        </div>
        <div className="bottom">
          <span>{this.state.currentTime}</span>
        </div>
        <Modal
          title="确定退出吗?"
          visible={this.state.visible === 1}
          onOk={this.onOk}
          onCancel={this.onCancel}
          okText="确认"
          cancelText="取消"
        ></Modal>
      </div>
    );
  }
}

export default withRouter(Header);
