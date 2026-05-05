import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

/**
 * AdminLayout — wraps all authenticated pages with a consistent
 * Header + Sidebar + scrollable main content area.
 *
 * Eliminates the repeated boilerplate from every page component and
 * ensures Header (which fetches user details) is mounted once at the
 * layout level instead of re-mounting on every navigation.
 */
function AdminLayout() {
  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-layout__main">
        <Header />
        <div className="admin-layout__content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
