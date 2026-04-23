"use client";

import axios from "axios";
import { BASE_URL_USER } from "@/API";
import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loginChecked, setLoginChecked] = useState(false);
  const [projects, setProjects] = useState([]);
  const [extensions, setExtensions] = useState([]);
  const [profile, setProfile] = useState(null);
  const [coreServices, setCoreServices] = useState([]);
  const [homeData, setHomeData] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);

  // 🔹 Load token once
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      if (storedToken) setToken(storedToken);
    }
  }, []);

  // 🔹 Fetch home data first, then rest in parallel
  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);

      try {
        // 1️⃣ Fetch home data first
        await fetchHomeData();

        // 2️⃣ After home data completes, fetch everything else in parallel
        await Promise.all([
          fetchProjects(),
          fetchExtensions(),
          fetchBlogs(),
          fetchServices(),
        ]);
      } catch (err) {
        console.error("Error during global data fetching:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [token]);

  // ✅ Fetch Home Data FIRST
  const fetchHomeData = async () => {
    try {
      const res = await axios.get(`${BASE_URL_USER}/home`);
      if (res.data?.status || res.data?.success) {
        setHomeData(res.data.data);
      } else {
        setError(res.data?.message || "Failed to fetch home page data.");
      }
    } catch (err) {
      console.error("❌ Error fetching home data:", err);
      setError(
        err.response?.data?.message ||
          "Something went wrong while loading home content."
      );
    }
  };

  // ✅ Fetch Core Services
  const fetchServices = async () => {
    try {
      const res = await axios.get(`${BASE_URL_USER}/services-all`);
      if (res.data?.status) {
        setCoreServices(res.data.data || []);
      } else {
        setError(res.data?.message || "Failed to fetch services.");
      }
    } catch (err) {
      console.error("❌ Error fetching core services:", err);
      setError("Failed to load services. Please try again later.");
    }
  };

  // ✅ Fetch Blogs
  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL_USER}/blogs-all`);
      if (data.status === true) {
        setBlogs(data.data || []);
      } else {
        throw new Error("Failed to load blogs");
      }
    } catch (err) {
      console.error("❌ Error fetching blogs:", err);
      setError("Failed to load blogs");
    }
  };

  // ✅ Fetch Projects
  const fetchProjects = async () => {
    try {
      const res = await axios.get(`${BASE_URL_USER}/project-all`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (res.data.status || res.data.success) {
        setProjects(res.data.data || res.data.projects || []);
      } else {
        setError(res.data.message || "Failed to fetch projects.");
      }
    } catch (err) {
      console.error("❌ Error fetching projects:", err);
      setError(
        err.response?.data?.message ||
          "Something went wrong while fetching projects."
      );
    }
  };

  // ✅ Fetch Extensions
  const fetchExtensions = async () => {
    try {
      const res = await axios.get(`${BASE_URL_USER}/extension-all`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (res.data.status || res.data.success) {
        setExtensions(res.data.data || res.data.extensions || []);
      } else {
        setError(res.data.message || "Failed to fetch extensions.");
      }
    } catch (err) {
      console.error("❌ Error fetching extensions:", err);
      setError(
        err.response?.data?.message ||
          "Something went wrong while fetching extensions."
      );
    }
  };

  return (
    <UserContext.Provider
      value={{
        loading,
        setLoading,
        loginChecked,
        setLoginChecked,
        projects,
        extensions,
        error,
        profile,
        blogs,
        coreServices,
        homeData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
