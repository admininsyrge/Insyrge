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

const TermsConditions = () => {
  const [loading, setLoading] = useState(false);
  const { handleSubmit, control, setValue } = useForm({
    defaultValues: { content: "" },
  });

  // Fetch existing terms content
  const fetchTerms = async () => {
    try {
      const res = await axios.get(`${BASE_URL_ADMIN}/terms-and-conditions`, {
        headers: { Token: localStorage.getItem("token") },
      });

      if (res.data?.data?.content) {
        setValue("content", res.data.data.content);
      }
    } catch (err) {
      toast.error("Failed to load Terms & Conditions");
    }
  };

  useEffect(() => {
    fetchTerms();
  }, []);

  // Submit (Create or Update)
  const onSubmit = async (data) => {
    try {
      setLoading(true);

      await axios.put(
        `${BASE_URL_ADMIN}/terms-and-conditions`,
        { content: data.content },
        { headers: { Token: localStorage.getItem("token") } }
      );

      toast.success("Terms & Conditions Updated Successfully");
    } catch (err) {
      toast.error("Failed to update Terms & Conditions");
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
            <Breadcrumb.Item active>Terms & Conditions</Breadcrumb.Item>
          </Breadcrumb>

          <section>
            <div className="col-12">
              <div className="comn-back-white">
                <h3 className="heading-view-med">Terms & Conditions</h3>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group className="comn-class-inputs">
                    <Form.Label>Terms & Conditions Content *</Form.Label>

                    <Controller
                      name="content"
                      control={control}
                      rules={{ required: "Content is required" }}
                      render={({ field }) => (
                        <RichTextEditor
                          value={field.value}
                          onChange={field.onChange}
                          placeholder="Write Terms & Conditions..."
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
                    {loading ? "Saving..." : "Save Terms"}
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

export default TermsConditions;
