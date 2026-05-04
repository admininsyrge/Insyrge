"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { BASE_URL_USER } from "@/API";
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
      <div className="skeleton-content py-8">
        <div className="skeleton skeleton-title mb-6"></div>
        <div className="skeleton skeleton-block mb-4"></div>
        <div className="skeleton skeleton-line mb-3"></div>
        <div className="skeleton skeleton-line mb-3"></div>
        <div className="skeleton skeleton-line-short mb-3"></div>
        <div className="skeleton skeleton-block mt-6"></div>
      </div>
    );
  }

  // === Error or Not Found ===
  if (error || !extension) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-semibold text-gray-400 mb-4">
          {error || "Extension not found ⚡"}
        </h2>
      </div>
    );
  }

  // === Render Extension Details ===
  return <ExtensionDetails extension={extension} />;
}
