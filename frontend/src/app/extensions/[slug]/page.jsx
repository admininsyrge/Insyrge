"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { BASE_URL, BASE_URL_USER } from "@/API";
import ExtensionDetails from "@/components/extensions/ExtensionDetails";

export default function ExtensionSlugPage() {
  const { slug } = useParams();
  const [extension, setExtension] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!slug) return;

    const fetchExtension = async () => {
      try {
        const res = await fetch(`${BASE_URL_USER}/extension/slug/${slug}`);
        const result = await res.json();

        if (result.status) {
          setExtension(result.data);
        } else {
          setError(result.message || "Extension not found.");
        }
      } catch (err) {
        console.error("❌ Error fetching extension:", err);
        setError("Something went wrong while loading extension details.");
      } finally {
        setLoading(false);
      }
    };

    fetchExtension();
  }, [slug]);

  // === Loading State ===
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#0B1C3D] text-gray-400 text-xl animate-pulse">
        Loading extension details...
      </div>
    );
  }

  // === Error or Not Found ===
  if (error || !extension) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#0B1C3D] text-white text-2xl">
        {error || "Extension not found ⚡"}
      </div>
    );
  }

  // === Render Extension Details ===
  return <ExtensionDetails extension={extension} />;
}
