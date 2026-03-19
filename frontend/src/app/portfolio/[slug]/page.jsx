"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { BASE_URL, BASE_URL_USER } from "@/API";
import PortfolioDetails from "@/components/portfolio/PortfolioDetails";

export default function PortfolioSlugPage() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!slug) return;

    const fetchProject = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${BASE_URL_USER}/project/slug/${slug}`);
        const result = await res.json();

        // 🧠 Depending on your backend response (either "status" or "success")
        if (result.status || result.success) {
          setProject(result.data);
        } else {
          setError(result.message || "Project not found.");
        }
      } catch (err) {
        console.error("❌ Error fetching project:", err);
        setError("Something went wrong while fetching project details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [slug]);

  // === Loading State ===
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#0B1C3D] text-gray-400 text-xl animate-pulse">
        Loading project details...
      </div>
    );
  }

  // === Error or Not Found ===
  if (error || !project) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#0B1C3D] text-white text-2xl">
        {error || "Project not found ⚡"}
      </div>
    );
  }

  // === Render Project Details ===
  return <PortfolioDetails project={project} />;
}
