import {
  createRootRouteWithContext,
  Link,
  Outlet,
} from "@tanstack/react-router";
import { ReactNode, useState } from "react";
import {
  UserOutlined,
  VideoCameraOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Button, Typography, Layout, Menu, theme } from "antd";
import "antd/dist/reset.css";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { QueryClient } from "@tanstack/react-query";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <LayoutComponent>
        <Outlet />
        <TanStackRouterDevtools />
      </LayoutComponent>
    </>
  );
}

const { Header, Content, Sider } = Layout;

function LayoutComponent({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: (
                <Link to="/">
                  <UserOutlined />
                </Link>
              ),
              label: "Home",
            },
            {
              key: "2",
              icon: (
                <Link to="/about">
                  <VideoCameraOutlined />
                </Link>
              ),
              label: "About",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            paddingRight: 40,
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <Typography.Title level={4} style={{ margin: 0 }}>
            Farm Dashboard
          </Typography.Title>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
