"use client";
import React from "react";
import ExtensionCard from "./ExtensionCard";

export default function ExtensionGrid({ extensions }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
      {extensions.map((item) => (
        <ExtensionCard key={item._id} extension={item} />
      ))}
    </div>
  );
}
