import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../../../components/Sidebar";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL_ADMIN, CREATE_EXTENSION } from "../../../API";
import RichTextEditor from "../../../components/RichTextEditor";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import "react-quill/dist/quill.snow.css";
import Header from "../../../components/Header";

const CreateExtension = () => {
  const navigate = useNavigate();
  const [previewImage, setPreviewImage] = useState(null);

  // ------------------ React Hook Form Setup ------------------
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      slug: "",
      title: "",
      description: "",
      longDescription: "",
      link: "",
      image: null,
      features: [{ title: "", description: "" }],
      benefits: [{ title: "", description: "" }],
    },
  });

  // watch title to auto-generate slug
  const titleValue = watch("title");

  useEffect(() => {
    const generatedSlug = titleValue
      ?.toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    setValue("slug", generatedSlug || "");
  }, [titleValue, setValue]);

  // watch image for preview
  const imageFile = watch("image");

  useEffect(() => {
    if (imageFile && imageFile[0]) {
      const file = imageFile[0];
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  }, [imageFile]);

  // ------------------ useFieldArray ------------------
  const {
    fields: featureFields,
    append: addFeature,
    remove: removeFeature,
  } = useFieldArray({
    control,
    name: "features",
  });

  const {
    fields: benefitFields,
    append: addBenefit,
    remove: removeBenefit,
  } = useFieldArray({
    control,
    name: "benefits",
  });

  // ------------------ Submit Handler ------------------
  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("slug", data.slug);
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("longDescription", data.longDescription);
      formData.append("link", data.link);
      if (data.image[0]) formData.append("image", data.image[0]);
      formData.append("features", JSON.stringify(data.features));
      formData.append("benefits", JSON.stringify(data.benefits));

      await axios.post(`${BASE_URL_ADMIN}${CREATE_EXTENSION}`, formData, {
        headers: {
          Token: localStorage.getItem("token"),
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Extension Created Successfully!");
      navigate("/extensions");
    } catch (error) {
      console.error("Error creating extension:", error);
      toast.error("Failed to create extension!");
    }
  };

  // ------------------ UI ------------------
  return (
    <div className="container-fluid">
      <Header />
      <div className="row">
        <Sidebar />
        <div className="col-9 main-dash-left">
          <Breadcrumb className="cstm_bredcrumb">
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/extensions" }}>
              Extensions Management
            </Breadcrumb.Item>
            <Breadcrumb.Item active>Create Extension</Breadcrumb.Item>
          </Breadcrumb>

          <section>
            <div className="col-12">
              <div className="comn-back-white">
                <h3 className="heading-view-med">Create New Extension</h3>

                <Form onSubmit={handleSubmit(onSubmit)}>
                  {/* TITLE */}
                  <Form.Group className="comn-class-inputs">
                    <Form.Label>Title *</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter extension title"
                      {...register("title", { required: "Title is required" })}
                    />
                    {errors.title && (
                      <small className="text-danger">
                        {errors.title.message}
                      </small>
                    )}
                  </Form.Group>

                  {/* SLUG */}
                  <Form.Group className="comn-class-inputs">
                    <Form.Label>Slug (auto-generated)</Form.Label>
                    <Form.Control type="text" {...register("slug")} readOnly />
                  </Form.Group>

                  {/* SHORT DESCRIPTION */}
                  <Form.Group className="comn-class-inputs">
                    <Form.Label>Short Description *</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter short description"
                      {...register("description", {
                        required: "Short description is required",
                      })}
                    />
                    {errors.description && (
                      <small className="text-danger">
                        {errors.description.message}
                      </small>
                    )}
                  </Form.Group>

                  {/* LONG DESCRIPTION */}
                  <Form.Group className="comn-class-inputs">
                    <Form.Label>Long Description *</Form.Label>
                    <Controller
                      name="longDescription"
                      control={control}
                      rules={{ required: "Long description is required" }}
                      render={({ field }) => (
                        <RichTextEditor
                          value={field.value}
                          onChange={field.onChange}
                          placeholder="Enter detailed description..."
                          height="300px"
                        />
                      )}
                    />
                    {errors.longDescription && (
                      <small className="text-danger">
                        {errors.longDescription.message}
                      </small>
                    )}
                  </Form.Group>

                  {/* LINK */}
                  <Form.Group className="comn-class-inputs">
                    <Form.Label>Extension Link *</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter extension link"
                      {...register("link", { required: "Link is required" })}
                    />
                    {errors.link && (
                      <small className="text-danger">
                        {errors.link.message}
                      </small>
                    )}
                  </Form.Group>

                  {/* IMAGE + PREVIEW */}
                  <Form.Group className="comn-class-inputs">
                    <Form.Label>Upload Image *</Form.Label>
                    <Form.Control
                      type="file"
                      accept="image/*"
                      {...register("image", { required: "Image is required" })}
                    />
                    {errors.image && (
                      <small className="text-danger">
                        {errors.image.message}
                      </small>
                    )}

                    {previewImage && (
                      <div className="mt-3 text-center">
                        <img
                          src={previewImage}
                          alt="Preview"
                          className="img-fluid rounded shadow-sm border"
                          style={{
                            maxWidth: "250px",
                            height: "auto",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                    )}
                  </Form.Group>

                  {/* FEATURES */}
                  <Form.Group className="comn-class-inputs">
                    <Form.Label>Features *</Form.Label>
                    {featureFields.map((item, index) => (
                      <div
                        key={item.id}
                        className="mb-3 border rounded p-3 bg-light position-relative"
                      >
                        <Form.Control
                          className="mb-2"
                          type="text"
                          placeholder="Feature Title"
                          {...register(`features.${index}.title`, {
                            required: "Feature title is required",
                          })}
                        />
                        <Form.Control
                          as="textarea"
                          rows={2}
                          placeholder="Feature Description"
                          {...register(`features.${index}.description`, {
                            required: "Feature description is required",
                          })}
                        />
                        {featureFields.length > 1 && (
                          <Button
                            variant="danger"
                            size="sm"
                            className="mt-2"
                            onClick={() => removeFeature(index)}
                          >
                            Remove Feature
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => addFeature({ title: "", description: "" })}
                    >
                      + Add Feature
                    </Button>
                  </Form.Group>

                  {/* BENEFITS */}
                  <Form.Group className="comn-class-inputs">
                    <Form.Label>Benefits *</Form.Label>
                    {benefitFields.map((item, index) => (
                      <div
                        key={item.id}
                        className="mb-3 border rounded p-3 bg-light position-relative"
                      >
                        <Form.Control
                          className="mb-2"
                          type="text"
                          placeholder="Benefit Title"
                          {...register(`benefits.${index}.title`, {
                            required: "Benefit title is required",
                          })}
                        />
                        <Form.Control
                          as="textarea"
                          rows={2}
                          placeholder="Benefit Description"
                          {...register(`benefits.${index}.description`, {
                            required: "Benefit description is required",
                          })}
                        />
                        {benefitFields.length > 1 && (
                          <Button
                            variant="danger"
                            size="sm"
                            className="mt-2"
                            onClick={() => removeBenefit(index)}
                          >
                            Remove Benefit
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => addBenefit({ title: "", description: "" })}
                    >
                      + Add Benefit
                    </Button>
                  </Form.Group>

                  {/* SUBMIT */}
                  <Button
                    className="comn-btn-pair mt-3"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Creating..." : "Create Extension"}
                  </Button>
                </Form>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CreateExtension;
