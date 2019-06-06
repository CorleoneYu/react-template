import React, { Component } from "react";
import ReactDOM from "react-dom";
import {
  Link,
  BrowserRouter,
  Route,
  Switch,
  Redirect,
  NavLink
} from "react-router-dom";

import Goods from "components/goods";
import User from "components/user";
import Order from "components/order";

import { Layout, Menu, Breadcrumb, Icon } from "antd";
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

export default class extends Component {
  render() {
    return (
      <BrowserRouter>
        <Layout>
          <Header className="header">
            <h1 className="cwhite">后台管理系统</h1>
          </Header>
          <Layout>
            <Sider width={200} style={{ background: "#fff" }}>
              <Menu
                mode="inline"
                defaultSelectedKeys={["1"]}
                defaultOpenKeys={["sub1"]}
                style={{ height: "100%", borderRight: 0 }}
              >
                <SubMenu
                  key="sub1"
                  title={
                    <span>
                      <Icon type="laptop" />
                      商品相关
                    </span>
                  }
                >
                  <Menu.Item key="1">
                    <NavLink to="/goods">商品</NavLink>
                  </Menu.Item>
                  <Menu.Item key="2">
                    <NavLink to="/order">订单</NavLink>
                  </Menu.Item>
                </SubMenu>
                <Menu.Item key="3">
                  <NavLink to="/user">
                    <Icon type="user" />
                    用户
                  </NavLink>
                </Menu.Item>
              </Menu>
            </Sider>
            <Layout style={{ padding: "0 24px 24px" }}>
              <Breadcrumb style={{ margin: "16px 0" }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>List</Breadcrumb.Item>
                <Breadcrumb.Item>App</Breadcrumb.Item>
              </Breadcrumb>
              <Content
                style={{
                  background: "#fff",
                  padding: 24,
                  margin: 0,
                  minHeight: 280
                }}
              >
                <Switch>
                  <Route path="/goods" component={Goods} />
                  <Route path="/user" component={User} />
                  <Route path="/order" component={Order} />
                  <Redirect from="*" to="/goods" />
                </Switch>
              </Content>
            </Layout>
          </Layout>
        </Layout>
        ,
      </BrowserRouter>
    );
  }
}
