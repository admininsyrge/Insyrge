import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../../../components/Sidebar";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import axios from "axios";
import { BASE_URL_ADMIN, CREATE_PROJECT } from "../../../API";
import { toast } from "react-toastify";
import RichTextEditor from "../../../components/RichTextEditor";
import Header from "../../../components/Header";

const CreateProject = () => {
  const [slug, setSlug] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [client, setClient] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [description, setDescription] = useState("");
  const [features, setFeatures] = useState([""]);
  const [gallery, setGallery] = useState([null, null, null, null, null]);
  const [galleryPreviews, setGalleryPreviews] = useState([
    null,
    null,
    null,
    null,
    null,
  ]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // 🔹 Auto-generate slug from title
  const handleTitleChange = (e) => {
    const inputTitle = e.target.value;
    setTitle(inputTitle);
    const generatedSlug = inputTitle
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    setSlug(generatedSlug);
  };

  // 🔹 Feature handlers
  const handleFeatureChange = (index, value) => {
    const updated = [...features];
    updated[index] = value;
    setFeatures(updated);
  };

  const addFeatureField = () => setFeatures([...features, ""]);
  const removeFeatureField = (index) =>
    setFeatures(features.filter((_, i) => i !== index));

  // 🔹 Main Image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // 🔹 Gallery Handlers
  const handleGalleryChange = (index, e) => {
    const file = e.target.files[0] || null;
    const updated = [...gallery];
    const previews = [...galleryPreviews];

    updated[index] = file;
    previews[index] = file ? URL.createObjectURL(file) : null;

    setGallery(updated);
    setGalleryPreviews(previews);
  };

  // 🔹 Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("slug", slug);
      formData.append("title", title);
      formData.append("category", category);
      formData.append("client", client);
      formData.append("description", description);

      if (image) formData.append("image", image);

      features.forEach((feature) => {
        if (feature.trim()) formData.append("features[]", feature);
      });

      gallery.forEach((file) => {
        if (file) formData.append("gallery", file);
      });

      await axios.post(`${BASE_URL_ADMIN}${CREATE_PROJECT}`, formData, {
        headers: {
          Token: localStorage.getItem("token"),
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Project Created Successfully!");
      navigate("/projects");
    } catch (error) {
      console.error("Error creating project:", error);
      toast.error("Failed to create project. Please try again.");
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
          <Breadcrumb className="cstm_bredcrumb">
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/projects" }}>
              Project Management
            </Breadcrumb.Item>
            <Breadcrumb.Item active>Create Project</Breadcrumb.Item>
          </Breadcrumb>

          <section>
            <div className="col-12">
              <div className="comn-back-white p-4 rounded-4 shadow-sm">
                <h3 className="heading-view-med mb-4 text-primary">
                  Create New Project
                </h3>

                <form onSubmit={handleSubmit}>
                  {/* Title */}
                  <Form.Group className="mb-3">
                    <Form.Label>Project Title *</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter project title"
                      value={title}
                      onChange={handleTitleChange}
                      required
                    />
                  </Form.Group>

                  {/* Slug */}
                  <Form.Group className="mb-3">
                    <Form.Label>Slug (auto-generated)</Form.Label>
                    <Form.Control
                      type="text"
                      value={slug}
                      readOnly
                      className="bg-light"
                    />
                  </Form.Group>

                  {/* Category */}
                  <Form.Group className="mb-3">
                    <Form.Label>Category *</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="e.g., Web App, Mobile App"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      required
                    />
                  </Form.Group>

                  {/* Client */}
                  <Form.Group className="mb-3">
                    <Form.Label>Client Name *</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter client name"
                      value={client}
                      onChange={(e) => setClient(e.target.value)}
                      required
                    />
                  </Form.Group>

                  {/* Main Image */}
                  <Form.Group className="mb-3">
                    <Form.Label>Main Project Image *</Form.Label>
                    <Form.Control
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      required
                    />
                    {imagePreview && (
                      <div className="mt-3">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="img-thumbnail rounded-3 shadow-sm"
                          width="220"
                        />
                      </div>
                    )}
                  </Form.Group>

                  {/* Description */}
                  <Form.Group className="mb-3">
                    <Form.Label>Project Description *</Form.Label>
                    <RichTextEditor
                      value={description}
                      onChange={setDescription}
                      placeholder="Enter project description..."
                      height="250px"
                    />
                  </Form.Group>

                  {/* Features */}
                  <Form.Group className="mb-4">
                    <Form.Label>Project Features</Form.Label>
                    {features.map((feature, index) => (
                      <div
                        key={index}
                        className="d-flex align-items-center gap-2 mb-2"
                      >
                        <Form.Control
                          type="text"
                          placeholder="Enter feature"
                          value={feature}
                          onChange={(e) =>
                            handleFeatureChange(index, e.target.value)
                          }
                        />
                        {index > 0 && (
                          <Button
                            variant="danger"
                            size="sm"
                            className="text-nowrap"
                            style={{ minWidth: "90px" }}
                            onClick={() => removeFeatureField(index)}
                            type="button"
                          >
                            Remove
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button
                      variant="secondary"
                      size="sm"
                      type="button"
                      onClick={addFeatureField}
                    >
                      + Add Feature
                    </Button>
                  </Form.Group>

                  {/* Gallery */}
                  <Form.Group className="mb-4">
                    <Form.Label>Gallery Images (Max 5)</Form.Label>
                    <div className="row">
                      {gallery.map((file, index) => (
                        <div key={index} className="col-md-4 mb-3">
                          <Form.Control
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleGalleryChange(index, e)}
                          />
                          {galleryPreviews[index] && (
                            <div className="mt-2 text-center">
                              <img
                                src={galleryPreviews[index]}
                                alt={`Gallery ${index + 1}`}
                                className="img-thumbnail rounded-3 shadow-sm"
                                width="200"
                              />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </Form.Group>

                  {/* Submit Button */}
                  <div className="text-center mt-4">
                    <Button
                      className="px-5 py-2 fw-semibold"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? "Creating..." : "Create Project"}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CreateProject;
