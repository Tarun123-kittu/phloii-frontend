"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import "./sidebar.css";
import { SidebarMenuItems } from "./SidebarMenu";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { toggle_sidebar } from "@/utils/redux/slices/sidebarSlice/manageSidebar";
import ResetModal from "../Modal/resetModal";
const useDeviceType = () => {
  const [deviceType, setDeviceType] = useState("Desktop");

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setDeviceType("Mobile");
      } else if (width >= 768 && width < 1024) {
        setDeviceType("Tablet");
      } else {
        setDeviceType("Desktop");
      }
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);

    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  return deviceType;
};

const SideBar = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const [currentPath, setCurrentPath] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();
  const [userName, setUserName] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [toggle, setToggle] = useState(false)
  const [user, setUser] = useState(null);
  const pathname = usePathname();
  const sidebarState = useSelector((state) => state.MANAGE_SIDEBAR.isSidebarOpen);
  const deviceType = useDeviceType();
  console.log(deviceType);

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
    router.push("/establishment");
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
    dispatch(toggle_sidebar(false))
    setActiveIndex(index);
  };

  const handleToogle = (val) => {
    dispatch(toggle_sidebar(val))
  }
  return (
    <div className="side_bar_wrapper">
      {showModal && <ResetModal  show={showModal}
          title="Modal Title"
          body="This is the modal content."
          onClose={() => setShowModal(false)}/>}
      <header className={`${sidebarState && 'toggle_header'} d-flex justify-content-end align-items-center`}>
        <div className={`${sidebarState ? 'd-none' : "d-block"} hamburger flex-grow-1`}>
          <svg onClick={() => handleToogle(true)} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.8504 4.8002C2.8504 4.64107 2.91362 4.48845 3.02614 4.37593C3.13866 4.26341 3.29127 4.2002 3.4504 4.2002H16.2504C16.4095 4.2002 16.5621 4.26341 16.6747 4.37593C16.7872 4.48845 16.8504 4.64107 16.8504 4.8002C16.8504 4.95933 16.7872 5.11194 16.6747 5.22446C16.5621 5.33698 16.4095 5.4002 16.2504 5.4002H3.4504C3.29127 5.4002 3.13866 5.33698 3.02614 5.22446C2.91362 5.11194 2.8504 4.95933 2.8504 4.8002ZM2.8504 14.4002C2.8504 14.2411 2.91362 14.0885 3.02614 13.9759C3.13866 13.8634 3.29127 13.8002 3.4504 13.8002H16.2504C16.4095 13.8002 16.5621 13.8634 16.6747 13.9759C16.7872 14.0885 16.8504 14.2411 16.8504 14.4002C16.8504 14.5593 16.7872 14.7119 16.6747 14.8245C16.5621 14.937 16.4095 15.0002 16.2504 15.0002H3.4504C3.29127 15.0002 3.13866 14.937 3.02614 14.8245C2.91362 14.7119 2.8504 14.5593 2.8504 14.4002ZM3.4504 9.0002C3.29127 9.0002 3.13866 9.06341 3.02614 9.17593C2.91362 9.28845 2.8504 9.44107 2.8504 9.6002C2.8504 9.75933 2.91362 9.91194 3.02614 10.0245C3.13866 10.137 3.29127 10.2002 3.4504 10.2002H16.2504C16.4095 10.2002 16.5621 10.137 16.6747 10.0245C16.7872 9.91194 16.8504 9.75933 16.8504 9.6002C16.8504 9.44107 16.7872 9.28845 16.6747 9.17593C16.5621 9.06341 16.4095 9.0002 16.2504 9.0002H3.4504Z" fill="white" fill-opacity="0.701961" />
          </svg>

        </div>

        {deviceType === "Desktop" && <div className="notify d-flex align-items-center justify-content-center position-relative">
          <span className="dot position-absolute"></span>
          <img src="/assets/notify.svg" alt="Notification Icon" />
        </div>}
      <div className="user">
         
          <div class="dropdown">
          <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
          <div className="user_image d-flex align-items-center justify-content-center">
            <img src="/assets/profile-circle.svg" alt="" />
          </div>
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li><a class="dropdown-item cursor-pointer" onClick={() => setShowModal(true)}>Change Password</a></li>
            <li><a class="dropdown-item cursor-pointer" href="#">Profile</a></li>
          </ul>
        </div>
        </div>
      </header>
      <div className={`${sidebarState ? "mobile_toggle" : ""} side_bar`}>
       <div className="d-flex flex-column h-100">
       <div className={`${sidebarState ? 'd-block' : "d-none"} text-end`}>

    <svg onClick={() => handleToogle(false)} width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z" fill="white" fill-opacity="0.72" />
      <path d="M13.2929 1.41L8.05645 6.64645L7.70289 7L8.05645 7.35355L13.2929 12.59L12.59 13.2929L7.35355 8.05645L7 7.70289L6.64645 8.05645L1.41 13.2929L0.707107 12.59L5.94355 7.35355L6.29711 7L5.94355 6.64645L0.707107 1.41L1.41 0.707107L6.64645 5.94355L7 6.29711L7.35355 5.94355L12.59 0.707107L13.2929 1.41Z" stroke="white" stroke-opacity="0.72" />
    </svg>

</div>
<div className="text-center mt-3 mb-5">
<img
  onClick={handleLogo}
  src="/assets/logo.svg"
  alt="Logo"
  className="m-auto"
/>
</div>
<ul className="m-0 h-100 d-flex flex-column flex-grow-1">
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
<li className="flex-grow-1"></li>
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

</ul>
       </div>
      </div>
      {children}
    </div>
  );
};

export default SideBar;
