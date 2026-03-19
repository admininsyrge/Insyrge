import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../../../components/Sidebar";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import axios from "axios";
import { toast } from "react-toastify";

import {
  BASE_URL_ADMIN,
  GET_EXTENSION,
  CREATE_STATIC_PAGE, // NEW constant
} from "../../../../API";

import RichTextEditor from "../../../../components/RichTextEditor";
import { useForm, Controller } from "react-hook-form";
import "react-quill/dist/quill.snow.css";
import Header from "../../../../components/Header";

const CreateStaticPage = () => {
  const navigate = useNavigate();
  const { pageType } = useParams(); // <-- GET pageType from URL

  const [extensions, setExtensions] = useState([]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      extensionId: "",
      title: "",
      content: "",
    },
  });

  // ---------------- Fetch All Extensions ----------------
  const fetchExtensions = async () => {
    try {
      const res = await axios.get(`${BASE_URL_ADMIN}${GET_EXTENSION}`, {
        headers: { Token: localStorage.getItem("token") },
      });
      setExtensions(res.data.data || []);
    } catch (err) {
      toast.error("Failed to fetch extensions");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchExtensions();
  }, []);

  // ---------------- Submit Handler ----------------
  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("extensionId", data.extensionId);
      formData.append("title", data.title);
      formData.append("content", data.content);

      await axios.post(
        `${BASE_URL_ADMIN}${CREATE_STATIC_PAGE(pageType)}`, // <-- dynamic API
        formData,
        {
          headers: {
            Token: localStorage.getItem("token"),
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success(`${pageType} Created Successfully!`);
      navigate(`/pages/${pageType}`);
    } catch (error) {
      console.error(error);
      toast.error(`Failed to create ${pageType}!`);
    }
  };

  // 🔥 Dynamic Page Title
  const pageTitleMap = {
    overview: "Overview",
    userGuide: "User Guide",
    terms: "Terms & Conditions",
    privacy: "Privacy Policy",
    adminGuide: "Admin Guide", // NEW
    help: "Help Page", // NEW
    caseStudy: "Case Study", // NEW
  };

  const pageLabel = pageTitleMap[pageType] || "Static Page";

  return (
    <div className="container-fluid">
      <Header />
      <div className="row">
        <Sidebar />

        <div className="col-9 main-dash-left">
          <Breadcrumb className="cstm_bredcrumb">
            <Breadcrumb.Item
              linkAs={Link}
              linkProps={{ to: `/pages/${pageType}` }}
            >
              {pageLabel} Management
            </Breadcrumb.Item>
            <Breadcrumb.Item active>Create {pageLabel}</Breadcrumb.Item>
          </Breadcrumb>

          <section>
            <div className="col-12">
              <div className="comn-back-white">
                <h3 className="heading-view-med">Create {pageLabel}</h3>

                <Form onSubmit={handleSubmit(onSubmit)}>
                  {/* EXTENSION DROPDOWN */}
                  <Form.Group className="comn-class-inputs">
                    <Form.Label>Select Extension *</Form.Label>

                    <Form.Select
                      {...register("extensionId", {
                        required: `${pageLabel} extension is required`,
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

                  {/* TITLE */}
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

                  {/* CONTENT */}
                  <Form.Group className="comn-class-inputs">
                    <Form.Label>Content *</Form.Label>

                    <Controller
                      name="content"
                      control={control}
                      rules={{ required: `${pageLabel} content is required` }}
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

                  {/* SUBMIT BUTTON */}
                  <Button
                    className="comn-btn-pair mt-3"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Creating..." : `Create ${pageLabel}`}
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

export default CreateStaticPage;
