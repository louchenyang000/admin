import React, { Component } from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import Header from "../../components/header/header";
import { Layout } from "antd";
import StoreUtils from "../../utils/StoreUtils";
import LeftNav from "../../components/leftnav/leftnav";
import Home from "./home/home";
import Category from "./product/category";
import AddProduct from "./product/AddProduct/AddProduct";
import Product from "./product/product";

import User from "./user/user";
import Role from "./role/role";
import Line from "./charts/line";
import Bar from "./charts/bar";
import Pie from "./charts/pie";

const { Footer, Sider, Content } = Layout;

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const user = StoreUtils.getUser();
    if (!user || !user._id) {
      return <Redirect to="/login" />;
    }
    return (
      <Layout style={{ height: "100%" }}>
        <Sider>
          <LeftNav />
        </Sider>
        <Layout>
          <Header>Header</Header>
          <Content>
            <Switch>
              <Route path="/home" component={Home} />
              <Route path="/category" component={Category} />
              <Route path="/product/addProduct" component={AddProduct} />
              <Route path="/product" component={Product} />

              <Route path="/role" component={Role} />
              <Route path="/user" component={User} />
              <Route path="/charts/line" component={Line} />
              <Route path="/charts/bar" component={Bar} />
              <Route path="/charts/pie" component={Pie} />
              <Redirect to="/home" />
            </Switch>
          </Content>
          <Footer>Footer</Footer>
        </Layout>
      </Layout>
    );
  }
}

export default Admin;
