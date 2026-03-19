import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useParams, useNavigate, Link } from "react-router-dom";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import axios from "axios";
import { toast } from "react-toastify";
import {
  BASE_URL,
  BASE_URL_ADMIN,
  GET_EXTENSION_BY_ID,
  UPDATE_EXTENSION,
} from "../../../API";
import RichTextEditor from "../../../components/RichTextEditor";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import "react-quill/dist/quill.snow.css";

const EditExtension = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(false);
  const [existingImage, setExistingImage] = useState(null);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors, isSubmitting },
    watch,
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

  // ✅ Fetch existing extension details
  useEffect(() => {
    const fetchExtension = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${BASE_URL_ADMIN}${GET_EXTENSION_BY_ID(id)}`,
          {
            headers: { Token: token },
          }
        );

        const ext = res.data?.data;
        if (ext) {
          reset({
            slug: ext.slug || "",
            title: ext.title || "",
            description: ext.description || "",
            longDescription: ext.longDescription || "",
            link: ext.link || "",
            features: ext.features?.length
              ? ext.features
              : [{ title: "", description: "" }],
            benefits: ext.benefits?.length
              ? ext.benefits
              : [{ title: "", description: "" }],
          });
          setExistingImage(ext.image || null);
        }
      } catch (error) {
        console.error("Error fetching extension:", error);
        toast.error("Failed to load extension details");
      } finally {
        setLoading(false);
      }
    };

    fetchExtension();
  }, [id, token, reset]);

  // ✅ Submit updated data
  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("slug", data.slug);
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("longDescription", data.longDescription);
      formData.append("link", data.link);
      // ✅ Append new image only if it exists
      if (data.image && data.image.length > 0 && data.image[0]) {
        formData.append("image", data.image[0]);
      }
      formData.append("features", JSON.stringify(data.features));
      formData.append("benefits", JSON.stringify(data.benefits));

      await axios.patch(`${BASE_URL_ADMIN}${UPDATE_EXTENSION(id)}`, formData, {
        headers: {
          Token: token,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Extension Updated Successfully!");
      navigate("/extensions");
    } catch (error) {
      console.error("Error updating extension:", error);
      toast.error("Failed to update extension. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ UI
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
            <Breadcrumb.Item active>Edit Extension</Breadcrumb.Item>
          </Breadcrumb>

          <section>
            <div className="col-12">
              <div className="comn-back-white">
                <h3 className="heading-view-med">Edit Extension</h3>

                <Form onSubmit={handleSubmit(onSubmit)}>
                  {/* Title */}
                  <Form.Group className="comn-class-inputs">
                    <Form.Label>Title *</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter title"
                      {...register("title", { required: "Title is required" })}
                    />
                    {errors.title && (
                      <small className="text-danger">
                        {errors.title.message}
                      </small>
                    )}
                  </Form.Group>

                  {/* Slug */}
                  <Form.Group className="comn-class-inputs">
                    <Form.Label>Slug</Form.Label>
                    <Form.Control type="text" {...register("slug")} readOnly />
                  </Form.Group>

                  {/* Description */}
                  <Form.Group className="comn-class-inputs">
                    <Form.Label>Short Description *</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter short description"
                      {...register("description", {
                        required: "Description is required",
                      })}
                    />
                    {errors.description && (
                      <small className="text-danger">
                        {errors.description.message}
                      </small>
                    )}
                  </Form.Group>

                  {/* Long Description */}
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

                  {/* Link */}
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

                  {/* Image */}
                  <Form.Group className="comn-class-inputs">
                    <Form.Label>Upload New Image (optional)</Form.Label>
                    <Form.Control
                      type="file"
                      accept="image/*"
                      {...register("image")}
                    />

                    <div className="mt-3 d-flex align-items-center gap-3">
                      {existingImage && (
                        <div>
                          <p className="mb-1">Existing Image:</p>
                          <img
                            src={`${BASE_URL}/uploads/${existingImage}`}
                            alt="Existing"
                            className="img-thumbnail"
                            width="200"
                          />
                        </div>
                      )}
                      {watch("image")?.[0] && (
                        <div>
                          <p className="mb-1">New Image Preview:</p>
                          <img
                            src={URL.createObjectURL(watch("image")[0])}
                            alt="Preview"
                            className="img-thumbnail"
                            width="200"
                          />
                        </div>
                      )}
                    </div>
                  </Form.Group>

                  {/* Features */}
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

                  {/* Benefits */}
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

                  {/* Submit */}
                  <Button
                    className="comn-btn-pair mt-3"
                    type="submit"
                    disabled={loading || isSubmitting}
                  >
                    {loading ? "Updating..." : "Update Extension"}
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

export default EditExtension;
