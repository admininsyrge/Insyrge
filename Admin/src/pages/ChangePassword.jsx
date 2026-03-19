import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Form from "react-bootstrap/Form";
import Sidebar from "../components/Sidebar";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { BASE_URL_ADMIN, CHANGE_PASSWORD } from "../API";
import axios from "axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Loader from "../components/Loader";
function ChangePassword() {
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm();
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate();
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [showPassword3, setShowPassword3] = useState(false);
  const changePasswordHandler = async (data) => {

    if (data.old_password === data.new_password) {
      toast.error("Current and New password cannot be same.");
      return
    }
    if (data.new_password !== data.new_password2) {
      toast.error("Create password and Confirm password must be same.");
      return
    }
    const formData = new FormData();
    formData.append("old_password", data.old_password);
    formData.append("new_password", data.new_password);
    formData.append("language", "ENGLISH");

    setIsLoading(true)
    try {
      const token = localStorage.getItem("token");
      const headers = { 'token': token }
      const response = await axios.put(BASE_URL_ADMIN + CHANGE_PASSWORD, formData, { headers });

      if (response.data.code === 200 && response.data.status === true) {
        toast.success(response.data.message);
        reset();
        navigate('/profile');
        setIsLoading(false)
      }
    }
    catch (error) {
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.error_description || "An error occurred";
        toast.error(errorMessage);
        setIsLoading(false)
      } else {
        toast.error("An error occurred");
        setIsLoading(false)
      }
    }
  }
  return (
    <>
      <Loader isLoading={isLoading} />
      <div className="container-fluid">
        <Header />
        <div className="row">
          <Sidebar />
          <div className="col-9 main-dash-left">
            <Breadcrumb
              className="cstm_bredcrumb" listProps={{ className: "breadcrumb-custom-separator" }}>
              <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/profile" }}>My Profile</Breadcrumb.Item>
              <Breadcrumb.Item active href='#'>Change Password</Breadcrumb.Item>
            </Breadcrumb>
            <section>
              <div className="comn-back-white">
                <h3 className="heading-view-med">Change password</h3>
                <div className="comm_form_border_box  mt-4">
                  <section className="back-comn-img">
                    <div className="custm-container">
                      <div className="edit-profile-amin">
                        <Form onSubmit={handleSubmit(changePasswordHandler)}>
                          <Row>
                            <Col md={6}>
                              <Form.Group className="comn-class-inputs">
                                <Form.Label>Old Password</Form.Label>
                                <div className="cstPassGroup">
                                  <Form.Control type={showPassword1 ? 'text' : "password"} placeholder="Enter Old Password"
                                    {...register('old_password', {
                                      required: 'Please enter old password.'
                                    })}
                                  />
                                  <div onClick={() => setShowPassword1(!showPassword1)} className="eyeToggleBtn">
                                    {showPassword1 ? <AiOutlineEye /> : < AiOutlineEyeInvisible />}
                                  </div>
                                </div>
                                {errors.old_password && <p className="error">{errors.old_password.message}</p>}
                              </Form.Group>
                            </Col>
                            <Col md={6}>
                              <Form.Group className="comn-class-inputs">
                                <Form.Label>New Password</Form.Label>
                                <div className="cstPassGroup">
                                  <Form.Control type={showPassword2 ? 'text' : "password"} placeholder="Enter New Password"
                                    {...register('new_password', {
                                      required: 'Please enter new password',
                                      maxLength: {
                                        value: 25,
                                        message: 'Password must be less than 25 characters'
                                      },
                                      pattern: {
                                        value: /^\S*$/,
                                        message: 'Password should not contain spaces'
                                      },
                                      pattern: {
                                        value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/,
                                        message: 'New password must be at least 8 characters long with uppercase, lowercase, number, special character, and no spaces.',
                                      }
                                    })}
                                  />
                                  <div onClick={() => setShowPassword2(!showPassword2)} className="eyeToggleBtn">
                                    {showPassword2 ? <AiOutlineEye /> : < AiOutlineEyeInvisible />}
                                  </div>
                                </div>
                                  {errors.new_password && <p className="error">{errors.new_password.message}</p>}
                              </Form.Group>
                            </Col>
                            <Col md={6}>
                              <Form.Group className="comn-class-inputs">
                                <Form.Label>Confirm New Password</Form.Label>
                                <div className="cstPassGroup">
                                  <Form.Control type={showPassword3 ? 'text' : "password"} placeholder="Confirm New Password"
                                    {...register('new_password2', {
                                      required: 'Please enter confirm new password',
                                      validate: (value) => value === watch('new_password') || 'New password and confirm new password does not match.',
                                    })}
                                  />
                                  <div onClick={() => setShowPassword3(!showPassword3)} className="eyeToggleBtn">
                                    {showPassword3 ? <AiOutlineEye /> : < AiOutlineEyeInvisible />}
                                  </div>
                                </div>
                                {errors.new_password2 && <p className="error">{errors.new_password2.message}</p>}
                              </Form.Group>
                            </Col>
                          </Row>
                          <div className="pair-btns-comn d-flex align-items-center gap-3 mt-3">
                            <Button className="comn-btn-pair" type="submit">Update Password</Button>
                            <Button className="comn-btn-pair back-white-btn" onClick={() => navigate('/profile')}>Discard</Button>
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

export default ChangePassword;
