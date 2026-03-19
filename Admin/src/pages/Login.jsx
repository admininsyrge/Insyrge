import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL_ADMIN, LOGIN } from "../API";
import Loader from "../components/Loader";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

function Login() {
  const token = localStorage.getItem("token");
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    const storedPassword = localStorage.getItem("password");
    setValue("email", storedEmail);
    setValue("password", storedPassword);
  }, []);

  const submitHandler = async (data) => {
    setIsLoading(true);
    try {
      const response = await axios.post(BASE_URL_ADMIN + LOGIN, data);
      if (response.data.code === 200 && response.data.status === true) {
        toast.success(response.data.data.message);
        if (rememberMe) {
          localStorage.setItem("email", data.email);
          localStorage.setItem("password", data.password);
        } else {
          localStorage.removeItem("email");
          localStorage.removeItem("password");
        }
        const token = response.data.data.user_details.access_token;
        localStorage.setItem("token", token);
        navigate("/projects");
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

  useEffect(() => {
    if (token) {
      navigate("/projects");
    }
  }, []);

  return (
    <>
      <Loader isLoading={isLoading} />
      <section className="login-section">
        <div className="container-fluid g-0">
          <Row className="row-min-h">
            <Col lg={6} className="img-n">
              <div className="upper-fig-main-login">
                <figure className="login-img-main">
                  <img src="/logo.png" alt=""/>
                </figure>
              </div>
            </Col>
            <Col lg={6}>
              <div className="inner-login-mian">
                <div className="loginupper-right">
                  <h2>Log in to your account</h2>
                  <p className="forg-pass-text">
                    Welcome back! Please fill the information below:{" "}
                  </p>
                  <Form onSubmit={handleSubmit(submitHandler)}>
                    <Row>
                      <Col md={12}>
                        <Form.Group className="comn-class-inputs">
                          <Form.Label>Email Address</Form.Label>
                          <Form.Control
                            type="email"
                            placeholder="Enter Your Username or Email Address"
                            {...register("email", { required: true })}
                          />
                          {errors.email && (
                            <span className="error">E-mail is required</span>
                          )}
                        </Form.Group>
                      </Col>
                      <Col md={12}>
                        <Form.Group className="comn-class-inputs">
                          <Form.Label>Password</Form.Label>
                          <div className="cstPassGroup">
                            <Form.Control
                              placeholder="Enter Your Password"
                              type={showPassword ? "text" : "password"}
                              onKeyDown={(e) => {
                                if (e.key === " ") {
                                  e.preventDefault();
                                }
                              }}
                              {...register("password", {
                                required: "Password is required",
                                maxLength: {
                                  value: 25,
                                  message:
                                    "Password must be less than 25 characters",
                                },
                                pattern: {
                                  value: /^\S*$/,
                                  message: "Password should not contain spaces",
                                },
                              })}
                            />
                            <div
                              onClick={togglePasswordVisibility}
                              className="eyeToggleBtn"
                            >
                              {showPassword ? (
                                <AiOutlineEyeInvisible />
                              ) : (
                                <AiOutlineEye />
                              )}
                            </div>
                          </div>
                          {errors.password && (
                            <span className="error">Password is required</span>
                          )}
                        </Form.Group>
                      </Col>
                    </Row>
                    <div className="upper-main-forgot-pass d-flex">
                      <div className="">
                        <Form.Group className="custom-checkbox">
                          <Form.Check
                            type="checkbox"
                            className="ps-0"
                            label="Remember Me"
                            id="checkbox1"
                            onClick={() => setRememberMe(!rememberMe)}
                            defaultChecked={rememberMe}
                          />
                        </Form.Group>
                      </div>
                      <Link className="forgot-link" to={"/forgotpassword"}>
                        Forgot Password?
                      </Link>
                    </div>
                    <Button className="login-btn" type="submit">
                      Login
                    </Button>
                  </Form>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </section>
    </>
  );
}

export default Login;
