"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { BASE_URL_USER } from "@/API";
import ServiceDetails from "@/components/services/ServiceDetails";

export default function ServicesSlugPage() {
  const { slug } = useParams();

  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!slug) return;

    const fetchService = async () => {
      try {
        const { data } = await axios.get(
          `${BASE_URL_USER}/service/slug/${slug}`,
        );

        console.log(data);

        if (data.status) {
          setService(data.data); // ✅ correct
        } else {
          setError(data.message || "Service not found.");
        }
      } catch (err) {
        console.error("❌ Error fetching service:", err);
        setError("Something went wrong while loading service details.");
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [slug]);

  // 🔄 Loading
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#0B1C3D] text-gray-400 text-xl animate-pulse">
        Loading service details...
      </div>
    );
  }

  // ❌ Error / Not Found
  if (error || !service) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#0B1C3D] text-white text-2xl">
        {error || "Service not found ⚡"}
      </div>
    );
  }

  // ✅ Render
  return <ServiceDetails service={service} />;
}
