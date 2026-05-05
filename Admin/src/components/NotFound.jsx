import React from "react";
import { useNavigate } from "react-router-dom";
import notFound from "../Assets/Images/404notFound2.png";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f6fa",
        gap: "2rem",
      }}
    >
      <img
        src={notFound}
        style={{ maxWidth: "460px", width: "90%", display: "block" }}
        className="not-found-child"
        alt="Page Not Found"
      />
      <button
        onClick={() => navigate(-1)}
        style={{
          padding: "1.2rem 3rem",
          fontSize: "1.6rem",
          fontWeight: 600,
          backgroundColor: "#111111",
          color: "#ffffff",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer",
          transition: "opacity 0.3s",
        }}
        onMouseOver={(e) => (e.target.style.opacity = "0.8")}
        onMouseOut={(e) => (e.target.style.opacity = "1")}
      >
        ← Go Back
      </button>
    </div>
  );
};

export default NotFound;