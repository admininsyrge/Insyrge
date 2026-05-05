import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 ml-sidebar flex flex-col min-h-screen transition-all duration-300">
        <Header />
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto max-h-[calc(100vh-72px)] scrollbar-thin">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
