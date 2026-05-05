import React from "react";
import { Rings } from "react-loader-spinner";

function Loader({ isLoading }) {
  if (!isLoading) return null;

  return (
    <div className="admin-loader-overlay">
      <Rings
        visible={true}
        height="80"
        width="80"
        radius="48"
        color="#111111"
        ariaLabel="loading"
      />
    </div>
  );
}

export default Loader;
