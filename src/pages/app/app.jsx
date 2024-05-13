import React, { Suspense, useEffect, useState } from 'react';
import './app.less';
import { Link, Outlet } from 'react-router-dom';
import { setREM } from '@/libs/rem';
const App = () => {
    useEffect(() => {
        setREM();
        // 监听屏幕分辨率，设置根字体大小
        window.onresize = () => {
            setREM();
        }
        return () => { };
    }, []);
    setTimeout(() => {
        throw new Error('asdfasd')
    }, 2000)
    return (
        <div className='mat-page-wrapper'>
            <div className='mat-page-container'>
                <header className='mat-page-header'>
                    <h1>Header</h1>
                </header>
                <nav className='mat-page-nav'>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/welcome">welcome</Link>
                        </li>
                        <li>
                            <Link to="/project">Projects</Link>
                        </li>
                        <li>
                            <Link to="/contact">Contact</Link>
                        </li>
                    </ul>
                    <form action='/home' method='get'>
                        <input type='search' name='q' placeholder='Search query' />
                        <input type='submit' value='Go' />
                    </form>
                </nav>
                <Suspense>
                    <Outlet />
                </Suspense>
                <footer className='mat-page-footer'>
                    <p>&copy;Copyright 2050 by liuyongyuan. All rights reversed.</p>
                </footer>
            </div>
        </div>
    );
}

export default App;