import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-screen items-center justify-center bg-gray-50 gap-8 p-8">
      <div className="text-center">
        <h1 className="text-8xl font-bold text-brand-900 mb-4">404</h1>
        <p className="text-xl text-gray-500 mb-2">Page Not Found</p>
        <p className="text-sm text-gray-400">The page you're looking for doesn't exist or has been moved.</p>
      </div>
      <button
        onClick={() => navigate(-1)}
        className="btn-primary text-base"
      >
        ← Go Back
      </button>
    </div>
  );
};

export default NotFound;