import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import user from "../Assets/Images/blank.png";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/slices/AdminDetails";
import { BASE_URL_ADMIN, IMAGE_URL, USER_DETAILS } from "../API";
import { toast } from "react-toastify";
import axios from "axios";

function Header() {
  const token = localStorage.getItem("token");
  const [isLoading, setIsLoading] = useState(false);
  const [userDetail, setUserDetail] = useState(null);
  const dispatch = useDispatch();
  const userStateDetail = useSelector((state) => state.user.user);

  useEffect(() => {
    getDetail();
  }, []);

  const getDetail = async () => {
    try {
      setIsLoading(true);

      const headers = { Token: token };
      const response = await axios.get(BASE_URL_ADMIN + USER_DETAILS, {
        headers,
      });

      if (response.data.code === 200 && response.status === 200) {
        const userDetail = response.data.data[0];
        setUserDetail(userDetail);
        dispatch(setUser(userDetail));
      } else {
        toast.error("Failed to fetch user details");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const errorMessage = error.response || "An error occurred";
        toast.error(errorMessage);
      } else {
        toast.error("An error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <nav className="dashboard_header navbar navbar-expand-lg navbar-admin">
      <div className="container-fluid m-0 p-0">
        <div className="welcom-upper d-flex">
          <h6 className="user_name">Hello {userStateDetail?.name || ""}</h6>
          <div className="dash_header_notify_wrap notifi-icon-na d-flex">
            <div className="divider"></div>
            <Link to="/profile" className="dash_profile_image">
              <img
                src={
                  userStateDetail?.image
                    ? IMAGE_URL + userStateDetail.image
                    : user
                }
                alt="User"
                className="img-fluid"
              />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
