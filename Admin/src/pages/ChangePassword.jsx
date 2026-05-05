import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/esm/Form";
import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Breadcrumb from "react-bootstrap/esm/Breadcrumb";
import { BASE_URL_ADMIN, CHANGE_PASSWORD } from "../API";
import axios from "axios";
import { toast } from "react-toastify";
import { useForm } from 'react-hook-form';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Loader from "../components/Loader";
function ChangePassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [showPassword3, setShowPassword3] = useState(false);
  const changePasswordHandler = async (data) => {
    if (data.old_password === data.new_password) {
      toast.error("Current and New password cannot be same.");
      return;
    }
    if (data.new_password !== data.new_password2) {
      toast.error("Create password and Confirm password must be same.");
      return;
    }
    const formData = new FormData();
    formData.append("old_password", data.old_password);
    formData.append("new_password", data.new_password);
    formData.append("language", "ENGLISH");

    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const headers = { token: token };
      const response = await axios.put(
        BASE_URL_ADMIN + CHANGE_PASSWORD,
        formData,
        { headers },
      );

      if (response.data.code === 200 && response.data.status === true) {
        toast.success(response.data.message);
        reset();
        navigate("/profile");
        setIsLoading(false);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const errorMessage =
          error.response.data.error_description || "An error occurred";
        toast.error(errorMessage);
        setIsLoading(false);
      } else {
        toast.error("An error occurred");
        setIsLoading(false);
      }
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
        <Breadcrumb.Item active>Change Password</Breadcrumb.Item>
      </Breadcrumb>
      <section>
        <div className="card">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Change password</h3>
          <div className="mt-6">
            <section className="">
              <div className="">
                <div className="">
                  <Form onSubmit={handleSubmit(changePasswordHandler)}>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-4">
                          <Form.Label>Old Password</Form.Label>
                          <div className="relative">
                            <Form.Control
                              type={showPassword1 ? "text" : "password"}
                              placeholder="Enter Old Password"
                              {...register("old_password", {
                                required: "Please enter old password.",
                              })}
                            />
                            <div
                              onClick={() => setShowPassword1(!showPassword1)}
                              className="password-toggle"
                            >
                              {showPassword1 ? (
                                <AiOutlineEye />
                              ) : (
                                <AiOutlineEyeInvisible />
                              )}
                            </div>
                          </div>
                          {errors.old_password && (
                            <p className="text-red-500 text-xs mt-1">
                              {errors.old_password.message}
                            </p>
                          )}
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-4">
                          <Form.Label>New Password</Form.Label>
                          <div className="relative">
                            <Form.Control
                              type={showPassword2 ? "text" : "password"}
                              placeholder="Enter New Password"
                              {...register("new_password", {
                                required: "Please enter new password",
                                maxLength: {
                                  value: 25,
                                  message:
                                    "Password must be less than 25 characters",
                                },
                                pattern: {
                                  value:
                                    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])\S{8,}$/,
                                  message:
                                    "Must be 8+ chars with uppercase, lowercase, number, special char, and no spaces.",
                                },
                              })}
                            />
                            <div
                              onClick={() => setShowPassword2(!showPassword2)}
                              className="password-toggle"
                            >
                              {showPassword2 ? (
                                <AiOutlineEye />
                              ) : (
                                <AiOutlineEyeInvisible />
                              )}
                            </div>
                          </div>
                          {errors.new_password && (
                            <p className="text-red-500 text-xs mt-1">
                              {errors.new_password.message}
                            </p>
                          )}
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-4">
                          <Form.Label>Confirm New Password</Form.Label>
                          <div className="relative">
                            <Form.Control
                              type={showPassword3 ? "text" : "password"}
                              placeholder="Confirm New Password"
                              {...register("new_password2", {
                                required: "Please enter confirm new password",
                                validate: (value) =>
                                  value === watch("new_password") ||
                                  "New password and confirm new password does not match.",
                              })}
                            />
                            <div
                              onClick={() => setShowPassword3(!showPassword3)}
                              className="password-toggle"
                            >
                              {showPassword3 ? (
                                <AiOutlineEye />
                              ) : (
                                <AiOutlineEyeInvisible />
                              )}
                            </div>
                          </div>
                          {errors.new_password2 && (
                            <p className="text-red-500 text-xs mt-1">
                              {errors.new_password2.message}
                            </p>
                          )}
                        </Form.Group>
                      </Col>
                    </Row>
                    <div className="flex items-center gap-3 mt-6">
                      <Button className="btn-primary" type="submit">
                        Update Password
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

export default ChangePassword;
