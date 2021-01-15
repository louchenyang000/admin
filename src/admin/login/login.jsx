import React, { Component } from "react";
import "./login.css";
import { Redirect } from "react-router-dom";
import Header from "./header/header";
import { Form, Icon, Input, Button, message } from "antd";
import { reqLogin } from "../../api";
import StoreUtils from "../../utils/StoreUtils";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        // 收集表单数据
        const { username, password } = values;
        // 调用登录接口
        const result = await reqLogin(username, password);
        if (result.status === 0) {
          const user = result.data;
          StoreUtils.saveUser(user);
          message.success("登陆成功", 1);
          this.props.history.replace("/");
        }
      }
    });
  };
  // 自定义验证规则
  validatorPwd = (rule, value, callback) => {
    if (!value) {
      callback("密码不能为空");
    } else if (value.length < 4) {
      callback("密码不能小于4位");
    } else if (value.length > 8) {
      callback("密码不能超过8位");
    } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
      callback("密码必须是字母数字下划线");
    } else {
      callback();
    }

    // Note: 必须总是返回一个 callback，否则 validateFieldsAndScroll 无法响应
    // callback();
  };
  render() {
    // 判断有没有登陆
    const user = StoreUtils.getUser();
    if (user && user._id) {
      //如果user存在，并且user._id存在
      return <Redirect to="/" />;
    }
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login">
        <Header />
        <div className="login-content">
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator("username", {
                rules: [
                  { required: true, message: "用户名不能为空" },
                  { min: 4, message: "用户名不得小于4位" },
                  { max: 8, message: "用户名不得超过8位" },
                ],
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Username"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("password", {
                rules: [
                  {
                    validator: this.validatorPwd,
                  },
                ],
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  placeholder="Password"
                />
              )}
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

export default Form.create()(Login);
