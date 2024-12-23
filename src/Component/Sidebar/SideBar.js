'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import './sidebar.css';
import { SidebarMenuItems } from './SidebarMenu';
import { useRouter } from 'next/navigation';
import { hotel_notifications, clear_hotel_notifications } from '@/utils/redux/slices/hotelOnboardingSlice/hotelNotifications';
import { useDispatch, useSelector } from 'react-redux';

const SideBar = ({ children }) => {
  const [currentPath, setCurrentPath] = useState('');
  const router = useRouter()
  const [userName, setUserName] = useState(null);
  const [user, setUser] = useState(null);
  const [notification_view, setNotification_view] = useState(false)
  const notifications = useSelector((store) => store.HOTEL_NOTIFICATIONS)
  console.log(notifications, "ths is the hiteol notifications")
  const dispatch = useDispatch()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentPath(window.location.pathname);
    }
  }, []);

  useEffect(() => {
    dispatch(hotel_notifications())
  }, [])

  const handleLogout = () => {
    localStorage.clear();
    router.push('/establishment/login')

  }
  const handleLogo = () => {
    router.push('establishment')
  }

  useEffect(() => {
    const storedUserName = localStorage?.getItem('phloii_user_name');
    const storedUser = localStorage?.getItem('phloii_user');

    setUserName(storedUserName);
    setUser(storedUser);
  }, []);

  return (
    <div className="side_bar_wrapper">
      <header className='d-flex justify-content-end'>
        <div className='position-relative'>
          <div className="notify d-flex align-items-center justify-content-center position-relative ms-auto">
            <span className='dot position-absolute'></span>
            <img src="/assets/notify.svg" alt="Notification Icon" onClick={() => setNotification_view(!notification_view)} /> </div>
          {notification_view && (
            <ul className="notify_list position-absolute">
              {notifications?.data?.data?.length === 0 ? (
                <li className='text-center'>No Notifications</li>
              ) : (
                notifications?.data?.data?.map((notification, index) => (
                  <li key={index}>{notification?.notification_text}</li>
                ))
              )}
            </ul>
          )}

        </div>
        <div className='user'>
          <div className='user_image d-flex align-items-center justify-content-center'>
            <img src="/assets/profile-circle.svg" alt="" />
          </div>
          <div className='d-inline-grid'>
            <h4 className='mb-0'>{userName}</h4>
            <span>{user}</span>
          </div>
        </div>
      </header>
      <div className="side_bar">
        <div className='text-center mt-3 mb-5'>
          <img onClick={handleLogo} src="/assets/logo.png" alt="Logo" className='m-auto' />
        </div>
        <ul className="m-0">
          {SidebarMenuItems &&
            SidebarMenuItems.map((menu, index) => {
              const isActive = currentPath.startsWith(menu.path);
              return (
                <li key={index} className={isActive ? 'sidebar_active' : ''}>
                  <Link href={menu.path}>
                    {menu.icon} <span>{menu.name}</span>
                  </Link>
                </li>
              );
            })}

          <li className='logout_btn' onClick={handleLogout}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.8999 7.55999C9.2099 3.95999 11.0599 2.48999 15.1099 2.48999H15.2399C19.7099 2.48999 21.4999 4.27999 21.4999 8.74999V15.27C21.4999 19.74 19.7099 21.53 15.2399 21.53H15.1099C11.0899 21.53 9.2399 20.08 8.9099 16.54" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M15.0001 12H3.62012" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M5.85 8.65002L2.5 12L5.85 15.35" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <span>Logout</span>
          </li>
        </ul>
      </div>
      {children}
    </div>
  );
};

export default SideBar;
