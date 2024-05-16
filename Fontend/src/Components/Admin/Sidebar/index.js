import { Fragment, useEffect, useRef, useState } from "react";
import React from "react";
import { Navigation } from "react-minimal-side-navigation";
import { AiOutlineHome, AiOutlineCode, AiOutlineHistory } from "react-icons/ai";
import { BsCalendarDate, BsChevronDoubleLeft } from "react-icons/bs";
import { TbDeviceDesktop } from "react-icons/tb";

import "react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css";
import { useNavigate } from "react-router-dom";

import "./style.css";

function Sidebar() {
  const navigate = useNavigate();

  return (
    <Fragment>
      <div
        className="py-3 shadow position-fixed left-0"
        style={{ width: "var(--sidebar-width", minHeight: "100vh" }}
      >
        <Navigation
          // you can use your own router's api to get pathname
          activeItemId={document.location.pathname}
          onSelect={({ itemId, index }) => {
            navigate(itemId);
          }}
          items={[
            {
              title: "Quản lý sách",
              itemId: "/admin/books",
              // you can use your own custom Icon component as well
              // icon is optional
              elemBefore: () => (
                <TbDeviceDesktop color="var(--primary)" size={24} />
              ),
            },

            {
              title: "Quản lý đơn mượn sách",
              itemId: '/admin/borrow-requests',
              // you can use your own custom Icon component as well
              // icon is optional
              elemBefore: () => (
                <TbDeviceDesktop color="var(--primary)" size={24} />
              ),
            },
            {
              title: "Quản lý tài khoản",
              itemId: "/admin/users",
              // you can use your own custom Icon component as well
              // icon is optional
              elemBefore: () => (
                <TbDeviceDesktop color="var(--primary)" size={24} />
              ),
            },
          ]}
        />
      </div>
    </Fragment>
  );
}

export default Sidebar;
