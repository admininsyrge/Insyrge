import { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL_ADMIN, CREATE_BLOG } from "../../../API";
import RichTextEditor from "../../../components/RichTextEditor";
import "react-quill/dist/quill.snow.css";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState(""); // 👈 new state for slug
  const [subTitle, setSubTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // 🧠 Automatically generate slug from title
  useEffect(() => {
    if (title) {
      const generatedSlug = title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "") // remove invalid chars
        .replace(/\s+/g, "-"); // replace spaces with dashes
      setSlug(generatedSlug);
    } else {
      setSlug("");
    }
  }, [title]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !subTitle || !description) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("title", title);
      formData.append("slug", slug); // 👈 include slug
      formData.append("subTitle", subTitle);
      formData.append("description", description);
      formData.append("shortDescription", shortDescription || "");
      formData.append("author", author || "Insyrge");
      formData.append("category", category || "");
      if (image) formData.append("image", image);

      await axios.post(`${BASE_URL_ADMIN}${CREATE_BLOG}`, formData, {
        headers: {
          Token: localStorage.getItem("token"),
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Blog Created Successfully!");
      navigate("/blogs");
    } catch (error) {
      console.error(error);
      toast.error("Failed to create blog. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid">
      <Header />
      <div className="row">
        <Sidebar />

        <div className="col-9 main-dash-left">
          <Breadcrumb
            className="cstm_bredcrumb"
            listProps={{ className: "breadcrumb-custom-separator" }}
          >
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/blogs" }}>
              Blog Management
            </Breadcrumb.Item>
            <Breadcrumb.Item active href="#">
              Create Blog
            </Breadcrumb.Item>
          </Breadcrumb>

          <section>
            <div className="row">
              <div className="col-12">
                <div className="comn-back-white">
                  <h3 className="heading-view-med">Create New Blog</h3>

                  <form onSubmit={handleSubmit}>
                    {/* Title */}
                    <Form.Group className="comn-class-inputs">
                      <Form.Label>Blog Title *</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter blog title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                      />
                    </Form.Group>

                    {/* Slug (Auto-generated, Readonly) */}
                    <Form.Group className="comn-class-inputs">
                      <Form.Label>Slug (auto-generated)</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Slug will be generated automatically"
                        value={slug}
                        readOnly
                      />
                    </Form.Group>

                    {/* SubTitle */}
                    <Form.Group className="comn-class-inputs">
                      <Form.Label>Sub Title *</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter blog sub title"
                        value={subTitle}
                        onChange={(e) => setSubTitle(e.target.value)}
                        required
                      />
                    </Form.Group>

                    {/* Author */}
                    <Form.Group className="comn-class-inputs">
                      <Form.Label>Author</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter author name"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                      />
                    </Form.Group>

                    {/* Category */}
                    <Form.Group className="comn-class-inputs">
                      <Form.Label>Category</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter blog category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                      />
                    </Form.Group>

                    {/* Short Description */}
                    <Form.Group className="comn-class-inputs">
                      <Form.Label>Short Description</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={4}
                        placeholder="Enter a short description (optional)"
                        value={shortDescription}
                        onChange={(e) => setShortDescription(e.target.value)}
                      />
                    </Form.Group>

                    {/* Description */}
                    <Form.Group className="comn-class-inputs">
                      <Form.Label>Blog Description *</Form.Label>
                      <RichTextEditor
                        value={description}
                        onChange={setDescription}
                        placeholder="Write the full blog content..."
                        height="600px"
                      />
                    </Form.Group>

                    {/* Image Upload */}
                    <Form.Group className="comn-class-inputs">
                      <Form.Label>Upload Cover Image</Form.Label>
                      <Form.Control
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                      {image && (
                        <div className="mt-3">
                          <img
                            src={URL.createObjectURL(image)}
                            alt="Preview"
                            className="img-thumbnail"
                            width="200"
                          />
                        </div>
                      )}
                    </Form.Group>

                    {/* Submit Button */}
                    <Button
                      className="comn-btn-pair"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? "Creating..." : "Create Blog"}
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;
