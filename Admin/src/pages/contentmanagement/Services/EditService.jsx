import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useParams, useNavigate, Link } from "react-router-dom";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import axios from "axios";
import { toast } from "react-toastify";
import {
  BASE_URL_ADMIN,
  GET_SERVICE_BY_ID,
  UPDATE_SERVICE,
} from "../../../API";
import RichTextEditor from "../../../components/RichTextEditor";

const EditService = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [points, setPoints] = useState([""]);
  const [button, setButton] = useState("");
  const [url, setURL] = useState("");
  const [image, setImage] = useState(null);
  const [existingImage, setExistingImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch service by id
  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          `${BASE_URL_ADMIN}${GET_SERVICE_BY_ID(id)}`,
          {
            headers: { Token: token },
          }
        );

        const data = res.data.data;

        setTitle(data.title || "");
        setSlug(data.slug || "");
        setDescription(data.description || "");
        setPoints(
          Array.isArray(data.points) && data.points.length ? data.points : [""]
        );
        setURL(data.url || "");
        setButton(data.button || "");
        setExistingImage(data.image || null);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch service data!");
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [id, token]);

  // ✅ Auto slug from title (optional but useful)
  const handleTitleChange = (value) => {
    setTitle(value);
    const autoSlug = value
      .toLowerCase()
      .replace(/[^a-z0-9 ]/g, "")
      .replace(/\s+/g, "-");
    setSlug(autoSlug);
  };

  const handlePointChange = (index, value) => {
    const updated = [...points];
    updated[index] = value;
    setPoints(updated);
  };

  const handleAddPoint = () => setPoints([...points, ""]);

  const handleRemovePoint = (index) => {
    const updated = [...points];
    updated.splice(index, 1);
    setPoints(updated.length ? updated : [""]);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // ✅ Update submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !slug || !description || !button || !url) {
      toast.error("Please fill all required fields");
      return;
    }

    if (!points.length || points.some((p) => !p.trim())) {
      toast.error("Please fill all points");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", title);
      formData.append("slug", slug);
      formData.append("description", description);
      formData.append("url", url);
      formData.append("button", button);

      points.forEach((p, i) => {
        if (p.trim()) {
          formData.append(`points[${i}]`, p.trim());
        }
      });

      if (image) {
        formData.append("image", image);
      }

      await axios.put(`${BASE_URL_ADMIN}${UPDATE_SERVICE(id)}`, formData, {
        headers: {
          Token: token,
        },
      });

      toast.success("Service Updated Successfully!");
      navigate("/services");
    } catch (error) {
      console.error("Error updating service:", error);
      toast.error(
        error?.response?.data?.message || "Failed to update service!"
      );
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
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/services" }}>
              Services Management
            </Breadcrumb.Item>
            <Breadcrumb.Item active>Edit Service</Breadcrumb.Item>
          </Breadcrumb>

          <section>
            <div className="col-12">
              <div className="comn-back-white">
                <h3 className="heading-view-med">Edit Service</h3>

                <form onSubmit={handleSubmit}>
                  {/* Title */}
                  <Form.Group className="comn-class-inputs">
                    <Form.Label>Title *</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter service title"
                      value={title}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      required
                    />
                  </Form.Group>

                  {/* Slug */}
                  <Form.Group className="comn-class-inputs">
                    <Form.Label>Slug *</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="enter-service-slug"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      required
                    />
                  </Form.Group>

                  {/* Description */}
                  <Form.Group className="comn-class-inputs">
                    <Form.Label>Description *</Form.Label>
                    <RichTextEditor
                      value={description}
                      onChange={setDescription}
                      placeholder="Write service details..."
                      height="300px"
                    />
                  </Form.Group>

                  {/* Points */}
                  <Form.Group className="comn-class-inputs">
                    <Form.Label>Points *</Form.Label>

                    {points.map((point, index) => (
                      <div
                        key={index}
                        className="d-flex align-items-center mb-2"
                      >
                        <Form.Control
                          type="text"
                          placeholder={`Enter point ${index + 1}`}
                          value={point}
                          onChange={(e) =>
                            handlePointChange(index, e.target.value)
                          }
                          required
                        />

                        {points.length > 1 && (
                          <Button
                            variant="danger"
                            size="sm"
                            className="ms-2"
                            onClick={() => handleRemovePoint(index)}
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
                      onClick={handleAddPoint}
                    >
                      + Add Point
                    </Button>
                  </Form.Group>

                  {/* URL */}
                  <Form.Group className="comn-class-inputs">
                    <Form.Label>URL *</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter service URL"
                      value={url}
                      onChange={(e) => setURL(e.target.value)}
                      required
                    />
                  </Form.Group>

                  {/* Button */}
                  <Form.Group className="comn-class-inputs">
                    <Form.Label>Button Text *</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter button label"
                      value={button}
                      onChange={(e) => setButton(e.target.value)}
                      required
                    />
                  </Form.Group>

                  {/* Image */}
                  <Form.Group className="comn-class-inputs">
                    <Form.Label>Upload Image</Form.Label>
                    <Form.Control
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                    />

                    <div className="mt-3 d-flex align-items-center gap-3">
                      {existingImage && !image && (
                        <div>
                          <p className="mb-1">Existing Image:</p>
                          <img
                            src={`${BASE_URL_ADMIN}${existingImage}`}
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

                  <Button
                    className="comn-btn-pair mt-3"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Updating..." : "Update Service"}
                  </Button>
                </form>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default EditService;
