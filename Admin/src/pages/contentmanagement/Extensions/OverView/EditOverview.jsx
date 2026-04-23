import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useParams, useNavigate, Link } from "react-router-dom";
import Header from "../../../../components/Header";
import Sidebar from "../../../../components/Sidebar";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import axios from "axios";
import { toast } from "react-toastify";

import {
  BASE_URL_ADMIN,
  BASE_URL_USER,
  GET_EXTENSION,
  GET_STATIC_PAGE_BY_ID,
  UPDATE_STATIC_PAGE,
} from "../../../../API";

import RichTextEditor from "../../../../components/RichTextEditor";
import { useForm, Controller } from "react-hook-form";
import "react-quill/dist/quill.snow.css";

const EditStaticPage = () => {
  const { id, pageType } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(false);
  const [extensions, setExtensions] = useState([]);

  // ---------------- Dynamic Page Label (auto formatting) ----------------
  const formatLabel = (str) => {
    return str
      .replace(/([A-Z])/g, " $1") // "userGuide" => "user Guide"
      .replace(/^./, (c) => c.toUpperCase()); // Capitalize
  };

  // Correct labels for common pages
  const specialLabels = {
    terms: "Terms & Conditions",
    adminGuide: "Admin Guide",
    help: "Help Page",
    caseStudy: "Case Study",
  };

  const pageLabel = specialLabels[pageType] || formatLabel(pageType);

  // ---------------- React Hook Form ----------------
  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      extensionId: "",
      title: "",
      content: "",
    },
  });

  // ---------------- Fetch Extensions ----------------
  const fetchExtensions = async () => {
    try {
      const res = await axios.get(`${BASE_URL_USER}${GET_EXTENSION}`);
      setExtensions(res.data.data || []);
    } catch (error) {
      toast.error("Failed to load extensions");
      console.error(error);
    }
  };

  // ---------------- Fetch Page Data by ID ----------------
  const fetchStaticPage = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${BASE_URL_ADMIN}${GET_STATIC_PAGE_BY_ID(pageType, id)}`,
        {
          headers: { Token: token },
        }
      );

      const data = res.data?.data;
      if (!data) return;

      reset({
        extensionId: data.extensionId,
        title: data.title,
        content: data.content,
      });
    } catch (error) {
      console.error(error);
      toast.error(`Failed to load ${pageLabel} details!`);
    } finally {
      setLoading(false);
    }
  };

  // ---------------- Load Data on Page Load ----------------
  useEffect(() => {
    fetchExtensions();
    fetchStaticPage();
  }, [id, pageType]);

  // ---------------- Extension Title for Heading ----------------
  const selectedExtensionTitle =
    extensions.find((ext) => ext._id === watch("extensionId"))?.title || "";

  // ---------------- Submit Handler ----------------
  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("extensionId", data.extensionId);
      formData.append("title", data.title);
      formData.append("content", data.content);

      await axios.patch(
        `${BASE_URL_ADMIN}${UPDATE_STATIC_PAGE(pageType, id)}`,
        formData,
        {
          headers: {
            Token: token,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success(`${pageLabel} Updated Successfully!`);
      navigate(`/pages/${pageType}`);
    } catch (error) {
      console.error(error);
      toast.error(`Failed to update ${pageLabel}!`);
    } finally {
      setLoading(false);
    }
  };

  // ---------------- UI ----------------
  return (
    <div className="container-fluid">
      <Header />
      <div className="row">
        <Sidebar />

        <div className="col-9 main-dash-left">
          {/* Breadcrumb */}
          <Breadcrumb className="cstm_bredcrumb">
            <Breadcrumb.Item
              linkAs={Link}
              linkProps={{ to: `/pages/${pageType}` }}
            >
              {pageLabel} Management
            </Breadcrumb.Item>

            <Breadcrumb.Item active>
              Edit {pageLabel}
              {/* {selectedExtensionTitle ? ` – ${selectedExtensionTitle}` : ""} */}
            </Breadcrumb.Item>
          </Breadcrumb>

          {/* Main Section */}
          <section>
            <div className="col-12">
              <div className="comn-back-white">
                {/* Heading */}
                <h3 className="heading-view-med">
                  Edit {pageLabel}
                  {selectedExtensionTitle ? ` – ${selectedExtensionTitle}` : ""}
                </h3>

                <Form onSubmit={handleSubmit(onSubmit)}>
                  {/* Extension Dropdown */}
                  <Form.Group className="comn-class-inputs">
                    <Form.Label>Select Extension *</Form.Label>
                    <Form.Select
                      {...register("extensionId", {
                        required: "Extension is required",
                      })}
                    >
                      <option value="">-- Select Extension --</option>
                      {extensions.map((ext) => (
                        <option key={ext._id} value={ext._id}>
                          {ext.title}
                        </option>
                      ))}
                    </Form.Select>
                    {errors.extensionId && (
                      <small className="text-danger">
                        {errors.extensionId.message}
                      </small>
                    )}
                  </Form.Group>

                  {/* Title */}
                  <Form.Group className="comn-class-inputs">
                    <Form.Label>Title *</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={`Enter ${pageLabel} title`}
                      {...register("title", { required: "Title is required" })}
                    />
                    {errors.title && (
                      <small className="text-danger">
                        {errors.title.message}
                      </small>
                    )}
                  </Form.Group>

                  {/* Content */}
                  <Form.Group className="comn-class-inputs">
                    <Form.Label>Content *</Form.Label>

                    <Controller
                      name="content"
                      control={control}
                      rules={{ required: "Content is required" }}
                      render={({ field }) => (
                        <RichTextEditor
                          value={field.value}
                          onChange={field.onChange}
                          placeholder={`Enter detailed ${pageLabel} content...`}
                          height="300px"
                        />
                      )}
                    />

                    {errors.content && (
                      <small className="text-danger">
                        {errors.content.message}
                      </small>
                    )}
                  </Form.Group>

                  {/* Submit Button */}
                  <Button
                    className="comn-btn-pair mt-3"
                    type="submit"
                    disabled={loading || isSubmitting}
                  >
                    {loading ? "Updating..." : `Update ${pageLabel}`}
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

export default EditStaticPage;
