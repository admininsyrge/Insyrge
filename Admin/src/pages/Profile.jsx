import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Form from "react-bootstrap/Form";
import Sidebar from "../components/Sidebar";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import prescript from "../Assets/Images/blank.png";
import editProfile from "../Assets/Images/edit_profile.svg";
import { IMAGE_URL, BASE_URL_ADMIN, UPLOAD_IMAGE, USER_DETAILS } from "../API";
import { useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { setUser } from "../redux/slices/AdminDetails";
import Loader from "../components/Loader";

function Profile() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [userDetail, setUserDetail] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    getUserDetail();
  }, []);

  const getUserDetail = async () => {
    setIsLoading(true);
    try {
      const headers = { token: token };
      const response = await axios.get(BASE_URL_ADMIN + USER_DETAILS, {
        headers,
      });
      if (response.status === 200 && response.data.code === 200) {
        setUserDetail(response.data.data[0]);
        const userDetail = response.data.data[0];
        dispatch(setUser(userDetail));
        setIsLoading(false);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message || "An error occurred";
        toast.error(errorMessage);
        setIsLoading(false);
      } else {
        toast.error("An error occurred");
        setIsLoading(false);
      }
    }
    setIsLoading(false);
  };

  const uploadImage = (e) => {
    const allowedTypes = ["image/png", "image/jpg", "image/jpeg"];
    if (!e.target.files || e.target.files.length === 0) {
      toast.error("Please select a file.");
      return;
    }

    const file = e.target.files[0];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Only JPG, and PNG files are allowed.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size should not exceed 5MB.");
      return;
    }
    imageUploadHandler(file);
  };

  const imageUploadHandler = async (file) => {
    setIsLoading(true);
    try {
      const headers = {
        token: token,
        "Content-Type": "multipart/form-data",
      };
      const formdata = new FormData();
      formdata.append("file", file);
      const response = await axios.post(
        BASE_URL_ADMIN + UPLOAD_IMAGE,
        formdata,
        { headers }
      );
      if (response.data.code === 200 && response.data.status === true) {
        toast.success(response?.data?.message);
        getUserDetail();
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
    setIsLoading(false);
  };
  return (
    <>
      <Loader isLoading={isLoading} />
      <div className="container-fluid">
        <Header />
        <div className="row">
          <Sidebar />
          <div className="col-9 main-dash-left">
            <section>
              <div className="comn-back-white">
                <h3 className="heading-view-med">My Profile</h3>
                <div className="comm_form_border_box  mt-4">
                  <section className="back-comn-img">
                    <div className="custm-container">
                      <div className="profile_main_page edit-profile-amin">
                        <Form>
                          <div className="my-profile-left d-flex employer_logo_edit">
                            <div className="profile-pic">
                              <label className="label" htmlFor="file">
                                <span className="glyphicon glyphicon-camera">
                                  <img
                                    src={editProfile}
                                    alt=""
                                    className="img-fluid"
                                  />
                                </span>
                              </label>
                              <Form.Control
                                id="file"
                                type="file"
                                name="profile_picture"
                                onChange={uploadImage}
                                accept="image/png, image/jpg, image/jpeg"
                              />
                              <figure className="profile-img-edit">
                                <img
                                  src={
                                    userDetail?.image !== null
                                      ? IMAGE_URL + userDetail?.image
                                      : prescript
                                  }
                                  alt=""
                                  className="img-fluid"
                                />
                              </figure>
                            </div>
                            <div className="pair-btns-comn d-flex align-items-center gap-3">
                              <div
                                onClick={() =>
                                  navigate("/edit-profile", {
                                    state: { ...userDetail },
                                  })
                                }
                              >
                                <Link className="comn-btn-pair btn btn-primary">
                                  Edit Profile
                                </Link>
                              </div>
                            </div>
                          </div>

                          <Row>
                            <Col md={12}>
                              <Form.Group
                                controlId="formGridPassword"
                                className="comn-class-inputs"
                              >
                                <Form.Label>Full Name</Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="Enter Your Full Name"
                                  defaultValue={userDetail?.name}
                                  disabled
                                />
                              </Form.Group>
                            </Col>
                            <Col md={12}>
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
                          <div className="profile_main_btm_sec">
                            <div className="d-flex cmm_prf_btm_row profile_auto_pay_row">
                              <h6>Do you want to update your password?</h6>
                              <Link
                                className="comn-btn-pair btn btn-primary"
                                to="/change-password"
                              >
                                Change Password
                              </Link>
                            </div>
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

export default Profile;
