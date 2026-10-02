"use client";

import axios from "axios";
import { BASE_URL_USER } from "@/API";
import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

const api = axios.create({
  baseURL: BASE_URL_USER,
});

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  // 🔹 Independent states (no global blocking)
  const [homeData, setHomeData] = useState(null);
  const [coreServices, setCoreServices] = useState([]);
  const [extensions, setExtensions] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [projects, setProjects] = useState([]);

  const [loading, setLoading] = useState(false);

  // ✅ Load token (non-blocking)
  useEffect(() => {
    const storedToken =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (storedToken) setToken(storedToken);
  }, []);

  // Note: Data is pre-rendered via Server Components / ISR on individual pages.
  // We avoid eager global fetchAll on mount to prevent downloading 4.5MB+ of data
  // and blocking home page critical rendering path. Individual fetch methods
  // are exposed below for on-demand use if needed.

  // ================= API CALLS =================

  const fetchHomeData = async () => {
    try {
      const res = await api.get("/home");
      if (res.data?.status || res.data?.success) {
        setHomeData(res.data.data);
      }
    } catch (err) {
      console.error("❌ Home:", err.message);
    }
  };

  const fetchServices = async () => {
    try {
      const res = await api.get("/services-all");
      if (res.data?.status) {
        setCoreServices(res.data.data || []);
      }
    } catch (err) {
      console.error("❌ Services:", err.message);
    }
  };

  const fetchBlogs = async () => {
    try {
      const { data } = await api.get("/blogs-all");
      if (data?.status) {
        setBlogs(data.data || []);
      }
    } catch (err) {
      console.error("❌ Blogs:", err.message);
    }
  };

  const fetchProjects = async () => {
    try {
      const res = await api.get("/project-all", {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (res.data?.status || res.data?.success) {
        setProjects(res.data.data || []);
      }
    } catch (err) {
      console.error("❌ Projects:", err.message);
    }
  };

  const fetchExtensions = async () => {
    try {
      const res = await api.get("/extension-all", {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (res.data?.status || res.data?.success) {
        setExtensions(res.data.data || []);
      }
    } catch (err) {
      console.error("❌ Extensions:", err.message);
    }
  };

  return (
    <UserContext.Provider
      value={{
        loading,
        homeData,
        coreServices,
        extensions,
        blogs,
        projects,
        fetchHomeData,
        fetchServices,
        fetchExtensions,
        fetchBlogs,
        fetchProjects,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);