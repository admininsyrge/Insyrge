"use client";
const TableOfContents = ({ blog }) => (
  <div className="bg-[#122852] p-6 rounded-xl shadow-lg sticky top-20">
    <h3 className="text-white font-semibold text-lg mb-4">Table of Contents</h3>
    <ul className="space-y-2 text-sm text-gray-300">
      {blog.content.map((c, i) => (
        <li
          key={i}
          className="hover:text-[#08e5c0] cursor-pointer transition-colors"
        >
          • {c.heading}
        </li>
      ))}
    </ul>
  </div>
);
export default TableOfContents;
