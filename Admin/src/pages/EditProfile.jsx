import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/esm/Form";
import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Breadcrumb from "react-bootstrap/esm/Breadcrumb";
import { BASE_URL_ADMIN, UPDATE_PROFILE } from "../API";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

function EditProfile() {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const [userDetail] = useState(location.state);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const token = localStorage.getItem("token");
  const [error, setError] = useState("");

  const updateProfile = async () => {
    if (error !== "") return;
    setIsLoading(true);
    try {
      const headers = { token: token };
      const formdata = new FormData();
      formdata.append("name", name || userDetail?.name);
      const response = await axios.post(
        BASE_URL_ADMIN + UPDATE_PROFILE,
        formdata,
        { headers },
      );
      if (response.status === 200 && response.data.code === 200) {
        toast.success(response.data.message);
        navigate("/profile");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.error_description || "An error occurred";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Loader isLoading={isLoading} />
      <Breadcrumb
        className="mb-5"
        listProps={{ className: "breadcrumb-custom-separator" }}
      >
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/profile" }}>
          My Profile
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Edit Profile</Breadcrumb.Item>
      </Breadcrumb>
      <section>
        <div className="card">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Update Profile</h3>
          <div className="mt-6">
            <section className="">
              <div className="">
                <div className="">
                  <Form>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-4">
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
                                  "Input cannot start or end with spaces, and cannot have multiple spaces between words.",
                                );
                              } else if (value.length >= 50) {
                                setError("Value cannot exceed 50 characters");
                              } else if (value.trim() === "") {
                                setError("Please enter full name.");
                              } else if (value.length < 3) {
                                setError(
                                  "Full name must be at least 3 characters long",
                                );
                              } else {
                                setError("");
                              }
                              setName(value);
                            }}
                          />
                          {error && (
                            <div style={{ color: "red", fontSize: "14px" }}>
                              {error}
                            </div>
                          )}
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group
                          controlId="formGridEmail"
                          className="mb-4"
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
                    <div className="flex items-center gap-3 mt-6">
                      <Button
                        className="btn-primary"
                        onClick={() => updateProfile()}
                      >
                        Update Profile
                      </Button>
                      <Button
                        className="btn-secondary"
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
    </>
  );
}

export default EditProfile;
