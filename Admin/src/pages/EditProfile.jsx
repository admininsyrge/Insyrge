import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Form from "react-bootstrap/Form";
import Sidebar from "../components/Sidebar";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { BASE_URL_ADMIN, UPDATE_PROFILE } from "../API";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

function EditProfile() {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const [userDetail, setUserDetail] = useState(location.state);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const token = localStorage.getItem("token");
  const [error, setError] = useState("");

  const updateProfile = async () => {
    if (error != "") {
      return;
    }
    setIsLoading(true);
    try {
      const headers = { token: token };
      const formdata = new FormData();
      formdata.append("name", name || userDetail?.name);
      const response = await axios.post(
        BASE_URL_ADMIN + UPDATE_PROFILE,
        formdata,
        { headers }
      );
      if (response.status === 200 && response.data.code === 200) {
        toast.success(response.data.message);
        navigate("/profile");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const errorMessage =
          error.response.data.error_description || "An error occurred";
        toast.error(errorMessage);
      } else {
        toast.error("An error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <Loader isLoading={isLoading} />
      <div className="container-fluid">
        <Header />
        <div className="row">
          <Sidebar />
          <div className="col-9 main-dash-left">
            <Breadcrumb
              className="cstm_bredcrumb"
              listProps={{ className: "breadcrumb-custom-separator" }}
            >
              <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/profile" }}>
                My Profile
              </Breadcrumb.Item>
              <Breadcrumb.Item active href="#">
                Edit Profile
              </Breadcrumb.Item>
            </Breadcrumb>
            <section>
              <div className="comn-back-white">
                <h3 className="heading-view-med">Update Profile</h3>
                <div className="comm_form_border_box  mt-4">
                  <section className="back-comn-img">
                    <div className="custm-container">
                      <div className="edit-profile-amin">
                        <Form>
                          <Row>
                            <Col md={6}>
                              <Form.Group className="comn-class-inputs">
                                <Form.Label>Full Name</Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="Enter Your Full Name"
                                  defaultValue={userDetail?.name}
                                  onChange={(e) => {
                                    let value = e.target.value;

                                    if (
                                      /^\s/.test(value) ||
                                      /\s{2,}/.test(value) ||
                                      /\s$/.test(value)
                                    ) {
                                      setError(
                                        "Input cannot start or end with spaces, and cannot have multiple spaces between words."
                                      );
                                    } else if (value.length >= 50) {
                                      setError(
                                        "Value cannot exceed 50 characters"
                                      );
                                    } else {
                                      setError("");
                                    }
                                    if (value.trim() === "") {
                                      setError("Please enter full name.");
                                    } else if (value.length < 3) {
                                      setError(
                                        "Full name must be at least 3 characters long"
                                      );
                                    } else {
                                      setError("");
                                    }
                                    setName(value);
                                  }}
                                />
                                {error && (
                                  <div
                                    style={{ color: "red", fontSize: "14px" }}
                                  >
                                    {error}
                                  </div>
                                )}
                              </Form.Group>
                            </Col>
                            <Col md={6}>
                              <Form.Group
                                controlId="formGridEmail"
                                className="comn-class-inputs"
                              >
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control
                                  type="email"
                                  placeholder="Enter Your Email Address"
                                  defaultValue={userDetail?.email}
                                  disabled
                                />
                              </Form.Group>
                            </Col>
                          </Row>
                          <div className="pair-btns-comn d-flex align-items-center gap-3 mt-3">
                            <Button
                              className="comn-btn-pair"
                              onClick={() => updateProfile()}
                            >
                              Update Profile
                            </Button>
                            <Button
                              className="comn-btn-pair back-white-btn"
                              type="submit"
                              onClick={() => navigate("/profile")}
                            >
                              Discard
                            </Button>
                          </div>
                        </Form>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditProfile;
