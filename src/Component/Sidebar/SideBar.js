"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import "./sidebar.css";
import { SidebarMenuItems } from "./SidebarMenu";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
const SideBar = ({ children }) => {
  const [currentPath, setCurrentPath] = useState("");
  const router = useRouter();
  const [userName, setUserName] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  console.log(activeIndex,"active index")
  const [user, setUser] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentPath(window.location.pathname);
    }
  }, []);
  const handleLogout = () => {
    localStorage.clear();
    router.push("/establishment/login");
  };
  const handleLogo = () => {
    router.push("establishment");
  };

  useEffect(() => {
    const storedUserName = localStorage?.getItem("phloii_user_name");
    const storedUser = localStorage?.getItem("phloii_user");

    setUserName(storedUserName);
    setUser(storedUser);
  }, []);

  useEffect(() => {
    // Set the active index based on the current route
    const activeItemIndex = SidebarMenuItems.findIndex((menu) => {
      const isEstablishmentRoute = pathname.startsWith("/establishment");
      return menu.path === "/establishment"
        ? pathname === menu.path
        : isEstablishmentRoute && pathname.includes(menu.path);
    });
    setActiveIndex(activeItemIndex);
  }, [pathname, SidebarMenuItems]);

  const handleMenuClick = (index) => {
    setActiveIndex(index);
  };
  return (
    <div className="side_bar_wrapper">
      <header className="d-flex justify-content-end">
        <div className="notify d-flex align-items-center justify-content-center position-relative">
          <span className="dot position-absolute"></span>
          <img src="/assets/notify.svg" alt="Notification Icon" />
        </div>
        <div className="user">
          <div className="user_image d-flex align-items-center justify-content-center">
            <img src="/assets/profile-circle.svg" alt="" />
          </div>
          <div className="d-inline-grid">
            <h4 className="mb-0">{userName}</h4>
            <span>{user}</span>
          </div>
        </div>
      </header>
      <div className="side_bar">
        <div className="text-center mt-3 mb-5">
          <img
            onClick={handleLogo}
            src="/assets/logo.svg"
            alt="Logo"
            className="m-auto"
          />
        </div>
        <ul className="m-0">
          {SidebarMenuItems &&
            SidebarMenuItems.map((menu, index) => {
              const isActive = activeIndex === index;
              return (
                <li
                  key={index}
                  className={isActive ? "sidebar_active" : ""}
                  onClick={() => handleMenuClick(index)}
                >
                  <Link href={menu.path}>
                    {menu.icon} <span>{menu.name}</span>
                  </Link>
                </li>
              );
            })}

          <li className="logout_btn" onClick={handleLogout}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.8999 7.55999C9.2099 3.95999 11.0599 2.48999 15.1099 2.48999H15.2399C19.7099 2.48999 21.4999 4.27999 21.4999 8.74999V15.27C21.4999 19.74 19.7099 21.53 15.2399 21.53H15.1099C11.0899 21.53 9.2399 20.08 8.9099 16.54"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M15.0001 12H3.62012"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5.85 8.65002L2.5 12L5.85 15.35"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Logout</span>
          </li>
          <li className="logout_btn" onClick={handleLogout}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.8999 7.55999C9.2099 3.95999 11.0599 2.48999 15.1099 2.48999H15.2399C19.7099 2.48999 21.4999 4.27999 21.4999 8.74999V15.27C21.4999 19.74 19.7099 21.53 15.2399 21.53H15.1099C11.0899 21.53 9.2399 20.08 8.9099 16.54"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M15.0001 12H3.62012"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M5.85 8.65002L2.5 12L5.85 15.35"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
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
