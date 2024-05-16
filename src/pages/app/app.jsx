import React, { Suspense, useEffect, useId, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { setREM } from '@/libs/rem';
import { Col, Layout, Menu, Row, theme } from 'antd';
import RouterMapperJson from '../../routes/router-mapper.json';

import './app.less';
const { Header, Content, Footer, Sider } = Layout;
const App = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    function getMenuItemArray(menuItemArray) {
        return menuItemArray.map(item => {
            item.key = useId();
            item.label = item.name;
            if (!item?.forawrd) {
                item.type = 'group';
                if (item?.children) {
                    item.children = getMenuItemArray(item.children)
                }
            }
            return item;
        })
    }
    const menuItems = getMenuItemArray(RouterMapperJson);
    const navigate = useNavigate();

    const [activeMenuArray, setActiveMenuArray] = useState([]);
    function handleActiveMenuArray(activeMenuKey) {
        const activeArray = [];
        let activeMenuItem = null;
        menuItems.forEach(item => {
            if (Object.is(item.key, activeMenuKey)) {
                activeArray.push(item);
            } else {
                if (item?.children) {
                    item.children.forEach(childItem => {
                        if (Object.is(childItem.key, activeMenuKey)) {
                            activeArray.push(item);
                            activeArray.push(childItem);
                            activeMenuItem = childItem;
                        }
                    })
                }
            }
        });
        setActiveMenuArray(activeArray);
        return activeMenuItem;
    }

    function handleMenuItemSelect({ item, key, keyPath, domEvent }) {
        const menuItem = handleActiveMenuArray(key);
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
                    <Row gutter={1}>
                        {
                            activeMenuArray.map(item => {
                                return (
                                    <Col span={2} key={item.key}>
                                        {item?.path ? <Link to={item.path}>{item.name}</Link> : item.name}
                                    </Col>
                                );
                            })
                        }
                    </Row>
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
        </Layout>
    );
}

export default App;