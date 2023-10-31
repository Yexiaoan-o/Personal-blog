import React, { useState } from 'react';
import {
  DesktopOutlined,
  FileOutlined,

} from '@ant-design/icons';
import {Layout, Menu, theme } from 'antd';
import {
  Outlet,
  useNavigate
} from "react-router-dom";


const { Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}


const items = [
  getItem('Workbench', 'workbench', <DesktopOutlined/>),
  getItem('Article Management', 'articleManagement', <FileOutlined />, [
    getItem('Add Article', 'addArticle',),
    getItem('Article List', 'articleList'),
  ])
];
const AdminIndex = () => {

  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  function handleClick (e){
    if (e.key == 'addArticle' || e.key == 'workbench'){
      navigate('add')
    } else {
      navigate('list')
    }
  
  }
  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} onClick={handleClick}/>
      </Sider>
      <Layout>

        <Content
          style={{
            margin: '0 16px',
          }}
        >

          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            {<Outlet />}
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          An Blog ©2023 Created by Oliver Ye
        </Footer>
      </Layout>
    </Layout>
  );
};
export default AdminIndex;