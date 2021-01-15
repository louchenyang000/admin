import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { Menu, Icon } from "antd";
import menuList from "../../config/menuConfig";
const { SubMenu } = Menu;
class Leftnav extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  // 动态获取菜单列表
  getmenulist = (menuList) => {
    const path = this.props.location.pathname;
    return menuList.map((item) => {
      if (!item.children) {
        return (
          <Menu.Item key={item.key}>
            <Link to={item.key}>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
        );
      } else {
        // 查看当前的菜单是不是子菜单,如果true说明我是孩子
        const cItem = item.children.find((cItem) => cItem.key === path);
        if (cItem) {
          this.openKey = item.key;
        }
        return (
          <SubMenu
            key={item.key}
            title={
              <span>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </span>
            }
          >
            {this.getmenulist(item.children)}
          </SubMenu>
        );
      }
    });
  };
  componentWillMount() {
    this.getMenuNodes = this.getmenulist(menuList);
  }
  render() {
    const path = this.props.location.pathname;
    const openKey = this.openKey;
    return (
      <div>
        <Menu
          selectedKeys={[path]}
          defaultOpenKeys={[openKey]}
          mode="inline"
          theme="dark"
        >
          {this.getMenuNodes}
        </Menu>
      </div>
    );
  }
}

export default withRouter(Leftnav);
