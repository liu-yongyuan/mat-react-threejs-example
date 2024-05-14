import React, { Suspense, useEffect, useId, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { setREM } from '@/libs/rem';
import { Layout, Menu, theme } from 'antd';
import RouterMapperJson from '../../routes/router-mapper.json';

import './app.less';
const { Header, Content, Footer, Sider } = Layout;
const App = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const menuItemMap = new Map();
    function getMenuItemArray(menuItemArray) {
        return menuItemArray.map(item => {
            item.key = useId();
            item.label = item.name;
            if (!item?.forawrd) {
                item.type = 'group';
                if (item.children) {
                    item.children = getMenuItemArray(item.children)
                }
            }
            menuItemMap.set(item.key, item);
            return item;
        })
    }
    const menuItems = getMenuItemArray(RouterMapperJson);
    const navigate = useNavigate();

    const [activeMenu, setActiveMenu] = useState(null);
    function handleMenuItemSelect({ item, key, keyPath, domEvent }) {
        const menuItem = menuItemMap.get(key);
        setActiveMenu(menuItem);
        if (Object.is(menuItem?.forawrd, 1) && menuItem?.path) {
            navigate(menuItem.path);
        }
    }

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
                <Menu mode='inline' items={menuItems} defaultActiveFirst={true} onSelect={handleMenuItemSelect}></Menu>
            </Sider>
            <Layout>
                <Header style={{ background: colorBgContainer }}>
                    {activeMenu?.name}
                </Header>
                <Content className='mat-page-content'>
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