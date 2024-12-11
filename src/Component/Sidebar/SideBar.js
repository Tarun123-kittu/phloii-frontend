'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import './sidebar.css';
import { SidebarMenuItems } from './SidebarMenu';

const SideBar = ({ children }) => {
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Ensure this runs only on the client
      setCurrentPath(window.location.pathname);
    }
  }, []);

  return (
    <div className="side_bar_wrapper">
      <header className='d-flex justify-content-end'>
        <div className="notify d-flex align-items-center justify-content-center position-relative">
            <span className='dot position-absolute'></span>
          <img src="/assets/notify.svg" alt="Notification Icon" />
        </div>
        <div className='user'>
            <div className='user_image d-flex align-items-center justify-content-center'>
                <img src="/assets/profile-circle.svg" alt="" />
            </div>
            <div className='d-inline-grid'>  
            <h4 className='mb-0'>Deepak rawat</h4>
            <span>deepak1212@gmail.com</span>
            </div>
        </div>
      </header>
      <div className="side_bar">
      <div className='text-center mt-3 mb-5'> 
      <img src="/assets/logo.png" alt="Logo" className='m-auto'/>
      </div>
        <ul className="m-0">
          {SidebarMenuItems &&
            SidebarMenuItems.map((menu, index) => {
              const isActive = menu.path === currentPath;
              return (
                <li key={index} className={isActive ? 'sidebar_active' : ''}>
                  <Link href={menu.path}>
                      {menu.icon} <span>{menu.name}</span>
              
                  </Link>
                </li>
              );
            })}
        </ul>
      </div>
      {children}
    </div>
  );
};

export default SideBar;
