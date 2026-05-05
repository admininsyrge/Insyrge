import React from "react";
import { Rings } from "react-loader-spinner";

function Loader({ isLoading }) {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/60 backdrop-blur-sm z-[99999]">
      <Rings visible={true} height="80" width="80" radius="48" color="#111111" ariaLabel="loading" />
    </div>
  );
}

export default Loader;
