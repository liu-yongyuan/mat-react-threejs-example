import React, { Suspense, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { setREM } from '@/libs/rem';
import { Layout, Menu, theme } from 'antd';
import './app.less';
const { Header, Content, Footer, Sider } = Layout;
const App = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const menuItems = [
        {
            key: '基本',
            label: '基本',
            type: 'group',
            children: [
                { key: '基本-基础', label: '基础' },
                { key: '基本-响应式设计', label: '响应式设计' },
                { key: '基本-先决条件', label: '先决条件' },
                { key: '基本-设置', label: '设置' }
            ]
        }
    ];

    useEffect(() => {
        setREM();
        // 监听屏幕分辨率，设置根字体大小
        window.onresize = () => {
            setREM();
        }
        return () => { };
    }, []);
    return (
        <Layout hasSider>
            <Sider className='mat-page-sider' style={{ background: colorBgContainer }}>
                <Menu mode='inline' items={menuItems} defaultSelectedKeys={['基本-基础']}></Menu>
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }} />
                <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                    <Suspense>
                        <Outlet />
                    </Suspense>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    &copy;Copyright 2050 by liuyongyuan. All rights reversed.
                </Footer>
            </Layout>
        </Layout >
    );
}

export default App;