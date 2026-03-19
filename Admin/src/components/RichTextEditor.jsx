import React, { useMemo, useRef } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaListOl,
  FaListUl,
  FaLink,
  FaImage,
  FaVideo,
  FaQuoteRight,
  FaCode,
  FaBrush,
} from "react-icons/fa";
import { BASE_URL_ADMIN } from "../API";

/* ✅ Custom Fonts */
const Font = Quill.import("formats/font");
Font.whitelist = [
  "arial",
  "poppins",
  "roboto",
  "lato",
  "montserrat",
  "times-new-roman",
  "courier-new",
];
Quill.register(Font, true);

export default function RichTextEditor({
  value,
  onChange,
  placeholder = "Write something awesome...",
  height = "300px",
}) {
  const quillRef = useRef();

  // 📌 IMAGE UPLOAD HANDLER
  const handleImageUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("image", file);

      try {
        const res = await axios.post(
          `${BASE_URL_ADMIN}/upload-editor-image`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Token: localStorage.getItem("token"),
            },
          }
        );

        const imageUrl = res.data.data.url;

        const editor = quillRef.current.getEditor();
        const range = editor.getSelection(true);
        editor.insertEmbed(range.index, "image", imageUrl);
        editor.setSelection(range.index + 1);
      } catch (error) {
        console.error("Upload Error:", error);
      }
    };
  };

  // 🛠 MODULES
  const modules = useMemo(
    () => ({
      toolbar: {
        container: "#custom-toolbar",
        handlers: {
          image: handleImageUpload, // 🔥 override image handler
        },
      },
    }),
    []
  );

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "blockquote",
    "code-block",
    "list",
    "bullet",
    "link",
    "image",
    "video",
    "align",
    "color",
    "background",
    "clean",
  ];

  // 🔥 Custom Toolbar JSX
  const CustomToolbar = useMemo(
    () => (
      <div id="custom-toolbar" className="custom-quill-toolbar">
        <span className="ql-formats">
          <select className="ql-header" defaultValue="">
            <option value="1">H1</option>
            <option value="2">H2</option>
            <option value="">P</option>
          </select>

          <select className="ql-font" defaultValue="arial">
            {Font.whitelist.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>

          <select className="ql-size" defaultValue="normal">
            <option value="small">Small</option>
            <option value="normal">Normal</option>
            <option value="large">Large</option>
            <option value="huge">Huge</option>
          </select>
        </span>

        <span className="ql-formats">
          <button className="ql-bold">
            <FaBold />
          </button>
          <button className="ql-italic">
            <FaItalic />
          </button>
          <button className="ql-underline">
            <FaUnderline />
          </button>
          <button className="ql-blockquote">
            <FaQuoteRight />
          </button>
          <button className="ql-code-block">
            <FaCode />
          </button>
        </span>

        <span className="ql-formats">
          <button className="ql-list" value="ordered">
            <FaListOl />
          </button>
          <button className="ql-list" value="bullet">
            <FaListUl />
          </button>
        </span>

        <span className="ql-formats">
          <button className="ql-link">
            <FaLink />
          </button>
          <button className="ql-image">
            <FaImage />
          </button>
          <button className="ql-video">
            <FaVideo />
          </button>
        </span>

        <span className="ql-formats">
          <select className="ql-align" defaultValue="">
            <option value=""></option>
            <option value="center"></option>
            <option value="right"></option>
            <option value="justify"></option>
          </select>
        </span>

        <span className="ql-formats">
          <select className="ql-color"></select>
          <select className="ql-background"></select>
        </span>

        <span className="ql-formats">
          <button className="ql-clean">
            <FaBrush />
          </button>
        </span>
      </div>
    ),
    []
  );

  return (
    <div className="rich-text-editor">
      {CustomToolbar}
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
        style={{ height }}
      />
    </div>
  );
}
