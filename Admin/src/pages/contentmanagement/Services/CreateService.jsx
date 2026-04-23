import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useForm, useFieldArray, Controller } from "react-hook-form";

import Sidebar from "../../../components/Sidebar";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL_ADMIN, CREATE_SERVICE } from "../../../API";
import RichTextEditor from "../../../components/RichTextEditor";
import Header from "../../../components/Header";

const CreateService = () => {
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      slug: "",
      description: "",
      button: "",
      url: "",
      points: [{ value: "" }],
      image: null,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "points",
  });

  // ✅ Auto-generate slug from title
  const handleTitleChange = (e) => {
    const value = e.target.value;
    const slug = value
      .toLowerCase()
      .replace(/[^a-z0-9 ]/g, "")
      .replace(/\s+/g, "-");
    setValue("slug", slug);
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("slug", data.slug);
      formData.append("description", data.description);
      formData.append("button", data.button);
      formData.append("url", data.url);

      // ✅ Points
      data.points.forEach((point, i) => {
        if (point.value?.trim()) {
          formData.append(`points[${i}]`, point.value.trim());
        }
      });

      // ✅ Image Required
      if (data.image && data.image[0]) {
        formData.append("image", data.image[0]);
      } else {
        toast.error("Please upload an image");
        setLoading(false);
        return;
      }

      await axios.post(`${BASE_URL_ADMIN}${CREATE_SERVICE}`, formData, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      toast.success("Service Created Successfully!");
      navigate("/services");
    } catch (error) {
      console.error("Error creating service:", error);
      toast.error(
        error?.response?.data?.message || "Failed to create service!"
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
            <Breadcrumb.Item active>Create Service</Breadcrumb.Item>
          </Breadcrumb>

          <section>
            <div className="col-12">
              <div className="comn-back-white">
                <h3 className="heading-view-med">Create New Service</h3>

                <form onSubmit={handleSubmit(onSubmit)}>
                  {/* Title */}
                  <Form.Group className="comn-class-inputs">
                    <Form.Label>Title *</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter service title"
                      {...register("title", { required: "Title is required" })}
                      onChange={handleTitleChange}
                    />
                    {errors.title && (
                      <span className="text-danger">
                        {errors.title.message}
                      </span>
                    )}
                  </Form.Group>

                  {/* Slug */}
                  <Form.Group className="comn-class-inputs">
                    <Form.Label>Slug *</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="enter-service-slug"
                      {...register("slug", {
                        required: "Slug is required",
                        pattern: {
                          value: /^[a-z0-9-]+$/,
                          message: "Slug must be lowercase with hyphens only",
                        },
                      })}
                    />
                    {errors.slug && (
                      <span className="text-danger">{errors.slug.message}</span>
                    )}
                  </Form.Group>

                  {/* Description */}
                  <Form.Group className="comn-class-inputs">
                    <Form.Label>Description *</Form.Label>
                    <Controller
                      name="description"
                      control={control}
                      rules={{ required: "Description is required" }}
                      render={({ field }) => (
                        <RichTextEditor
                          value={field.value}
                          onChange={field.onChange}
                          placeholder="Write service details..."
                          height="300px"
                        />
                      )}
                    />
                    {errors.description && (
                      <span className="text-danger">
                        {errors.description.message}
                      </span>
                    )}
                  </Form.Group>

                  {/* Points */}
                  <Form.Group className="comn-class-inputs">
                    <Form.Label>Points *</Form.Label>
                    {fields.map((item, index) => (
                      <div
                        key={item.id}
                        className="d-flex align-items-center mb-2"
                      >
                        <Form.Control
                          type="text"
                          placeholder={`Enter point ${index + 1}`}
                          {...register(`points.${index}.value`, {
                            required: "Point is required",
                          })}
                        />
                        {fields.length > 1 && (
                          <Button
                            variant="danger"
                            size="md"
                            className="ms-3 text-nowrap px-4"
                            style={{ minWidth: "20px" }}
                            onClick={() => remove(index)}
                            type="button"
                          >
                            Remove
                          </Button>
                        )}
                      </div>
                    ))}

                    <Button
                      className="comn-btn-pair mt-3"
                      size="sm"
                      type="button"
                      onClick={() => append({ value: "" })}
                    >
                      + Add Point
                    </Button>

                    {errors.points?.[0]?.value && (
                      <span className="text-danger">
                        {errors.points[0].value.message}
                      </span>
                    )}
                  </Form.Group>

                  {/* URL */}
                  <Form.Group className="comn-class-inputs">
                    <Form.Label>URL *</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter service URL"
                      {...register("url", { required: "URL is required" })}
                    />
                    {errors.url && (
                      <span className="text-danger">{errors.url.message}</span>
                    )}
                  </Form.Group>

                  {/* Button Text */}
                  <Form.Group className="comn-class-inputs">
                    <Form.Label>Button Text *</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter button label"
                      {...register("button", {
                        required: "Button text is required",
                      })}
                    />
                    {errors.button && (
                      <span className="text-danger">
                        {errors.button.message}
                      </span>
                    )}
                  </Form.Group>

                  {/* Image */}
                  <Form.Group className="comn-class-inputs">
                    <Form.Label>Upload Image *</Form.Label>
                    <Form.Control
                      type="file"
                      accept="image/*"
                      {...register("image", {
                        required: "Image is required",
                      })}
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          setImagePreview(URL.createObjectURL(file));
                        }
                      }}
                    />

                    {imagePreview && (
                      <div className="mt-3">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="img-thumbnail"
                          width="200"
                        />
                      </div>
                    )}

                    {errors.image && (
                      <span className="text-danger">
                        {errors.image.message}
                      </span>
                    )}
                  </Form.Group>

                  <Button
                    className="comn-btn-pair mt-3"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Creating..." : "Create Service"}
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

export default CreateService;
