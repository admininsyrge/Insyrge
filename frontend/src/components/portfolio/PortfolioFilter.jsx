import React from "react";

export default function PortfolioFilter({ categories, selected, onSelect }) {
  return (
    <div className="flex flex-wrap justify-center gap-4 mb-12">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`px-5 py-2 rounded-full border transition-all ${
            selected === cat
              ? "bg-[#08e5c0] text-[#0B1C3D] border-[#08e5c0]"
              : "border-gray-600 text-gray-300 hover:border-[#08e5c0] hover:text-[#08e5c0]"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
