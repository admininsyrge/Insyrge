import { Button, Form } from "react-bootstrap";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL_ADMIN } from "../../../API";
import { toast } from "react-toastify";
import Sidebar from "../../../components/Sidebar";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { useEffect, useState } from "react";
import RichTextEditor from "../../../components/RichTextEditor";
import Header from "../../../components/Header";
const EditProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [slug, setSlug] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [client, setClient] = useState("");
  const [description, setDescription] = useState("");
  const [features, setFeatures] = useState([""]);
  const [mainImage, setMainImage] = useState(null);
  const [existingMainImage, setExistingMainImage] = useState(null);
  const [gallery, setGallery] = useState([null, null, null, null, null]);
  const [existingGallery, setExistingGallery] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  // ✅ Auto-generate slug from title
  const handleTitleChange = (e) => {
    const value = e.target.value;
    setTitle(value);
    const generatedSlug = value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    setSlug(generatedSlug);
  };

  // ✅ Fetch existing project
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${BASE_URL_ADMIN}/project/${id}`, {
        headers: { Token: token },
      })
      .then((res) => {
        const data = res.data.data;
        setSlug(data.slug);
        setTitle(data.title);
        setCategory(data.category);
        setClient(data.client);
        setDescription(data.description);
        setFeatures(data.features?.length ? data.features : [""]);
        setExistingMainImage(data.image || null);
        setExistingGallery(data.gallery || []);
      })
      .catch((err) => {
        toast.error("Failed to fetch project details!");
      })
      .finally(() => setLoading(false));
  }, [id, token]);

  // ✅ Handle feature list changes
  const handleFeatureChange = (index, value) => {
    const updated = [...features];
    updated[index] = value;
    setFeatures(updated);
  };

  const addFeatureField = () => setFeatures([...features, ""]);
  const removeFeatureField = (index) =>
    setFeatures(features.filter((_, i) => i !== index));

  // ✅ Handle gallery uploads
  const handleGalleryChange = (index, e) => {
    const file = e.target.files[0] || null;
    const updated = [...gallery];
    updated[index] = file;
    setGallery(updated);
  };

  // ✅ Handle submit (PATCH)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("slug", slug);
      formData.append("title", title);
      formData.append("category", category);
      formData.append("client", client);
      formData.append("description", description);

      features.forEach((f) => formData.append("features[]", f));

      if (mainImage && typeof mainImage !== "string") {
        formData.append("image", mainImage);
      }

      gallery.forEach((file) => {
        if (file && typeof file !== "string") formData.append("gallery", file);
      });

      await axios.put(`${BASE_URL_ADMIN}/project/${id}`, formData, {
        headers: {
          Token: token,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Project Updated Successfully!");
      navigate("/projects");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update project!");
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
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/projects" }}>
              Project Management
            </Breadcrumb.Item>
            <Breadcrumb.Item active>Edit Project</Breadcrumb.Item>
          </Breadcrumb>

          <section>
            <div className="row">
              <div className="col-12">
                <div className="comn-back-white">
                  <h3 className="heading-view-med">Edit Project</h3>

                  <form onSubmit={handleSubmit}>
                    {/* Slug */}
                    <Form.Group className="comn-class-inputs">
                      <Form.Label>Slug</Form.Label>
                      <Form.Control
                        type="text"
                        value={slug}
                        readOnly
                        className="bg-light"
                      />
                    </Form.Group>

                    {/* Title */}
                    <Form.Group className="comn-class-inputs">
                      <Form.Label>Project Title</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter project title"
                        value={title}
                        onChange={handleTitleChange}
                        required
                      />
                    </Form.Group>

                    {/* Category */}
                    <Form.Group className="comn-class-inputs">
                      <Form.Label>Category</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                      />
                    </Form.Group>

                    {/* Client */}
                    <Form.Group className="comn-class-inputs">
                      <Form.Label>Client Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter client name"
                        value={client}
                        onChange={(e) => setClient(e.target.value)}
                        required
                      />
                    </Form.Group>

                    {/* Description */}
                    <Form.Group className="comn-class-inputs">
                      <Form.Label>Project Description</Form.Label>
                      <RichTextEditor
                        value={description}
                        onChange={setDescription}
                        placeholder="Edit project description..."
                        height="300px"
                      />
                    </Form.Group>

                    {/* Features */}
                    <Form.Group className="comn-class-inputs">
                      <Form.Label>Features</Form.Label>
                      {features.map((feature, index) => (
                        <div key={index} className="d-flex mb-2 gap-2">
                          <Form.Control
                            type="text"
                            placeholder="Enter feature"
                            value={feature}
                            onChange={(e) =>
                              handleFeatureChange(index, e.target.value)
                            }
                            required
                          />
                          {index > 0 && (
                            <Button
                              variant="danger"
                              onClick={() => removeFeatureField(index)}
                            >
                              -
                            </Button>
                          )}
                        </div>
                      ))}
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={addFeatureField}
                      >
                        + Add Feature
                      </Button>
                    </Form.Group>

                    {/* Existing main image */}
                    {existingMainImage && (
                      <div className="mb-3">
                        <Form.Label>Existing Main Image</Form.Label>
                        <div>
                          <img
                            src={`${BASE_URL_ADMIN}/${existingMainImage}`}
                            alt="main-img"
                            style={{
                              width: "120px",
                              height: "120px",
                              objectFit: "cover",
                              borderRadius: "5px",
                            }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Replace Main Image */}
                    <Form.Group className="comn-class-inputs">
                      <Form.Label>Replace Main Image</Form.Label>
                      <Form.Control
                        type="file"
                        accept="image/*"
                        onChange={(e) => setMainImage(e.target.files[0])}
                      />
                      {mainImage && (
                        <span className="badge bg-primary mt-2">
                          {mainImage.name}
                        </span>
                      )}
                    </Form.Group>

                    {/* Existing gallery */}
                    {existingGallery.length > 0 && (
                      <div className="mb-3">
                        <Form.Label>Existing Gallery Images</Form.Label>
                        <div className="d-flex flex-wrap">
                          {existingGallery.map((img, idx) => (
                            <img
                              key={idx}
                              src={`${BASE_URL_ADMIN}/${img}`}
                              alt={`gallery-${idx}`}
                              style={{
                                width: "100px",
                                height: "100px",
                                objectFit: "cover",
                                marginRight: "10px",
                                borderRadius: "5px",
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Upload new gallery */}
                    <Form.Group className="comn-class-inputs">
                      <Form.Label>Upload Gallery Images (Max 5)</Form.Label>
                      {gallery.map((file, index) => (
                        <div key={index} className="mb-2">
                          <Form.Control
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleGalleryChange(index, e)}
                          />
                          {file && (
                            <span className="badge bg-info mt-1">
                              {file.name}
                            </span>
                          )}
                        </div>
                      ))}
                    </Form.Group>

                    <Button
                      className="comn-btn-pair"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? "Updating..." : "Update Project"}
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

export default EditProject;
