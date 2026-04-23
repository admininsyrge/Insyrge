import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useParams, useNavigate, Link } from "react-router-dom";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL_ADMIN, GET_BLOG_BY_ID, UPDATE_BLOG } from "../../../API";
import RichTextEditor from "../../../components/RichTextEditor";

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState(""); // 👈 added slug
  const [subTitle, setSubTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [existingImage, setExistingImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ Generate slug from title automatically
  useEffect(() => {
    if (title) {
      const generatedSlug = title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");
      setSlug(generatedSlug);
    }
  }, [title]);

  // ✅ Fetch existing blog data
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${BASE_URL_ADMIN}${GET_BLOG_BY_ID(id)}`, {
          headers: { Token: token },
        });
        const blog = res.data?.data;

        if (blog) {
          setTitle(blog.title || "");
          setSlug(blog.slug || ""); // 👈 set slug from API
          setSubTitle(blog.subTitle || "");
          setShortDescription(blog.shortDescription || "");
          setAuthor(blog.author || "Insyrge");
          setCategory(blog.category || "");
          setDescription(blog.description || "");
          setExistingImage(blog.image || null);
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
        toast.error("Failed to load blog details");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id, token]);

  // ✅ Handle new image upload
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // ✅ Submit updated data
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
      formData.append("slug", slug); // 👈 include slug in update
      formData.append("subTitle", subTitle);
      formData.append("shortDescription", shortDescription || "");
      formData.append("author", author || "Insyrge");
      formData.append("category", category);
      formData.append("description", description);
      if (image) formData.append("image", image);

      await axios.put(`${BASE_URL_ADMIN}${UPDATE_BLOG(id)}`, formData, {
        headers: {
          Token: token,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Blog Updated Successfully!");
      navigate("/blogs");
    } catch (error) {
      console.error("Error updating blog:", error);
      toast.error("Failed to update blog. Please try again.");
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
            <Breadcrumb.Item active>Edit Blog</Breadcrumb.Item>
          </Breadcrumb>

          <section>
            <div className="row">
              <div className="col-12">
                <div className="comn-back-white">
                  <h3 className="heading-view-med">Edit Blog</h3>

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

                    {/* Slug (Auto-generated, editable if needed) */}
                    <Form.Group className="comn-class-inputs">
                      <Form.Label>Slug</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Auto-generated slug"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                      />
                      <Form.Text className="text-muted">
                        You can edit this if needed. It updates automatically
                        from the title.
                      </Form.Text>
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

                    {/* Image Section */}
                    <Form.Group className="comn-class-inputs">
                      <Form.Label>Upload Cover Image</Form.Label>
                      <Form.Control
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                      />

                      <div className="mt-3 d-flex align-items-center gap-3">
                        {existingImage && (
                          <div>
                            <p className="mb-1">Existing Image:</p>
                            <img
                              src={existingImage.url}
                              alt="Existing"
                              className="img-thumbnail"
                              width="200"
                            />
                          </div>
                        )}

                        {image && (
                          <div>
                            <p className="mb-1">New Image Preview:</p>
                            <img
                              src={URL.createObjectURL(image)}
                              alt="Preview"
                              className="img-thumbnail"
                              width="200"
                            />
                          </div>
                        )}
                      </div>
                    </Form.Group>

                    {/* Submit */}
                    <Button
                      className="comn-btn-pair mt-3"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? "Updating..." : "Update Blog"}
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

export default EditBlog;
