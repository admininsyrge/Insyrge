import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL_ADMIN } from "../../../API";
import RichTextEditor from "../../../components/RichTextEditor";

const PrivacyPolicy = () => {
  const [loading, setLoading] = useState(false);
  const { handleSubmit, control, setValue } = useForm({
    defaultValues: { content: "" },
  });

  // Fetch existing privacy content
  const fetchPrivacy = async () => {
    try {
      const res = await axios.get(`${BASE_URL_ADMIN}/privacy`, {
        headers: { Token: localStorage.getItem("token") },
      });

      if (res.data?.data?.content) {
        setValue("content", res.data.data.content);
      }
    } catch (err) {
      toast.error("Failed to load Privacy Policy");
    }
  };

  useEffect(() => {
    fetchPrivacy();
  }, []);

  // Submit (Create or Update)
  const onSubmit = async (data) => {
    try {
      setLoading(true);

      await axios.put(
        `${BASE_URL_ADMIN}/privacy`,
        { content: data.content },
        { headers: { Token: localStorage.getItem("token") } }
      );

      toast.success("Privacy Policy Updated Successfully");
    } catch (err) {
      toast.error("Failed to update Privacy Policy");
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
            <Breadcrumb.Item>Content Management</Breadcrumb.Item>
            <Breadcrumb.Item active>Privacy Policy</Breadcrumb.Item>
          </Breadcrumb>

          <section>
            <div className="col-12">
              <div className="comn-back-white">
                <h3 className="heading-view-med">Privacy Policy</h3>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group className="comn-class-inputs">
                    <Form.Label>Privacy Policy Content *</Form.Label>

                    <Controller
                      name="content"
                      control={control}
                      rules={{ required: "Content is required" }}
                      render={({ field }) => (
                        <RichTextEditor
                          value={field.value}
                          onChange={field.onChange}
                          placeholder="Write Privacy Policy..."
                          height="400px"
                        />
                      )}
                    />
                  </Form.Group>

                  <Button
                    className="comn-btn-pair mt-3"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Saving..." : "Save Policy"}
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

export default PrivacyPolicy;
