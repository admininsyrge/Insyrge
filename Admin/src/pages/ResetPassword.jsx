import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import loginimg from '../Assets/Images/Phrase_box_Logo.jpg';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BASE_URL_ADMIN, RESET_PASSWORD, CHECKSECURITYCODE } from '../API';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

function ResetPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm();

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const getSecurityCode = searchParams.get('security_code') || '';
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const token = localStorage.getItem('token');
  const newPassword = watch('newPassword');
  const [isLinkValid, setIsLinkValid] = useState(true);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    if (token) {
      navigate('/dashboard');
    }
  }, [token, navigate]);

  useEffect(() => {
    if (!getSecurityCode || getSecurityCode.trim() === '') {
      setIsLinkValid(false);
      setLoading(false);
    } else {
      fetchSecurityCode();
    }
  }, [getSecurityCode]);

  const fetchSecurityCode = async () => {
    setLoading(true);
    try {
      const response = await axios.post(BASE_URL_ADMIN + CHECKSECURITYCODE, {
        security_code: getSecurityCode,
        language: 'ENGLISH',
      });

      if (response.status === 200) {
        setIsLinkValid(true);
      } else {
        setIsLinkValid(false);
      }
    } catch (error) {
      setIsLinkValid(false);
    } finally {
      setLoading(false);
    }
  };

  const submitHandler = async (data) => {
    const formData = new FormData();
    formData.append('password', data?.newPassword);
    formData.append('confirmPassword', data?.confirmPassword);
    formData.append('security_code', getSecurityCode);

    try {
      const response = await axios.post(BASE_URL_ADMIN + RESET_PASSWORD, formData);
      toast.success(response?.data?.data?.message || 'Password reset successful');
      navigate('/login');
    } catch (error) {
      const errMessage = error?.response?.data?.error_description || "Something went wrong";
      toast.error(errMessage);
    }
  };

  return (
    <section className="login-section">
      <div className="container-fluid g-0">
        <Row className='row-min-h'>
          <Col lg={6} className='img-n'>
            <div className="upper-fig-main-login">
              <figure className='login-img-main'>
                <img src={loginimg} alt="Login Visual" />
              </figure>
            </div>
          </Col>
          <Col lg={6}>
            <div className="inner-login-mian">
              <div className="loginupper-right">
                <h2>Reset Password</h2>

                {loading ? (
                  <p>Validating your link...</p>
                ) : isLinkValid ? (
                  <Form onSubmit={handleSubmit(submitHandler)}>
                    <Row>
                      <Col md={12}>
                        <Form.Group className="comn-class-inputs">
                          <Form.Label>New Password</Form.Label>
                          <div className="cstPassGroup">
                            <Form.Control
                              type={showPassword ? 'text' : 'password'}
                              placeholder="Enter New Password"
                              onKeyDown={(e) => { if (e.key === " ") { e.preventDefault(); } }}
                              {...register('newPassword', {
                                required: 'This field is required',
                                maxLength: {
                                  value: 25,
                                  message: 'Password must be less than 25 characters'
                                },
                                pattern: {
                                  value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/,
                                  message: 'New password must be at least 8 characters long with uppercase, lowercase, number, special character, and no spaces.',
                                }
                              })}
                            />
                            <div onClick={() => setShowPassword(!showPassword)} className="eyeToggleBtn">
                              {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                            </div>
                          </div>
                          {errors.newPassword && <p className="error">{errors.newPassword.message}</p>}
                        </Form.Group>
                      </Col>

                      <Col md={12}>
                        <Form.Group className="comn-class-inputs">
                          <Form.Label>Confirm New Password</Form.Label>
                          <div className="cstPassGroup">
                            <Form.Control
                              type={showPassword1 ? 'text' : 'password'}
                              placeholder="Confirm New Password"
                              onKeyDown={(e) => { if (e.key === " ") { e.preventDefault(); } }}
                              {...register('confirmPassword', {
                                required: 'This field is required',
                                maxLength: {
                                  value: 25,
                                  message: 'Password must be less than 25 characters'
                                },
                                pattern: {
                                  value: /^\S*$/,
                                  message: 'Password should not contain spaces'
                                },
                                validate: (value) =>
                                  value === newPassword || 'New password and confirm new password must be the same.'
                              })}
                            />
                            <div onClick={() => setShowPassword1(!showPassword1)} className="eyeToggleBtn">
                              {showPassword1 ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                            </div>
                          </div>
                          {errors.confirmPassword && <p className="error">{errors.confirmPassword.message}</p>}
                        </Form.Group>
                      </Col>
                    </Row>
                    <Button className='login-btn' type="submit">Reset Password</Button>
                  </Form>
                ) : (
                  <>
                    <h2 style={{ color: "#bb2125" }}>Your password reset link has expired or is invalid.</h2>
                    <div className="auth-bottom-link-sec">
                      <p style={{fontSize:'20px'}}>
                        Please request a new reset link <Link to="/forgotpassword">here</Link>.
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
}

export default ResetPassword;
