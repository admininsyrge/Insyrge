import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL_ADMIN, UPLOAD_IMAGE, USER_DETAILS } from "../API";
import { useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { setUser } from "../redux/slices/AdminDetails";
import Loader from "../components/Loader";
import { getImageUrl, handleImageError } from "../utils/imageUtils";
import { Camera, Pencil, Lock } from "lucide-react";

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
      const response = await axios.get(BASE_URL_ADMIN + USER_DETAILS, { headers });
      if (response.status === 200 && response.data.code === 200) {
        setUserDetail(response.data.data[0]);
        dispatch(setUser(response.data.data[0]));
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const uploadImage = (e) => {
    const allowedTypes = ["image/png", "image/jpg", "image/jpeg"];
    if (!e.target.files || e.target.files.length === 0) {
      toast.error("Please select a file.");
      return;
    }
    const file = e.target.files[0];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Only JPG and PNG files are allowed.");
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
      const headers = { token: token, "Content-Type": "multipart/form-data" };
      const formdata = new FormData();
      formdata.append("file", file);
      const response = await axios.post(BASE_URL_ADMIN + UPLOAD_IMAGE, formdata, { headers });
      if (response.data.code === 200 && response.data.status === true) {
        toast.success(response?.data?.message);
        getUserDetail();
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error_description || "An error occurred";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Loader isLoading={isLoading} />

      {/* Profile Header Card */}
      <div className="card mb-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* Avatar with upload */}
          <div className="relative group shrink-0">
            <img
              src={getImageUrl(userDetail?.image)}
              alt="Profile"
              className="w-28 h-28 rounded-full object-cover ring-4 ring-gray-100"
              onError={handleImageError}
            />
            <label
              htmlFor="profile-upload"
              className="absolute bottom-1 right-1 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-emerald-600 transition-colors shadow-lg ring-2 ring-white"
            >
              <Camera size={14} className="text-white" />
            </label>
            <input
              id="profile-upload"
              type="file"
              className="hidden"
              onChange={uploadImage}
              accept="image/png, image/jpg, image/jpeg"
            />
          </div>

          {/* Info + Actions */}
          <div className="flex-1 text-center sm:text-left">
            <h3 className="text-2xl font-bold text-gray-900">{userDetail?.name || "—"}</h3>
            <p className="text-gray-500 mt-1">{userDetail?.email || "—"}</p>
            <div className="flex flex-wrap gap-3 mt-4 justify-center sm:justify-start">
              <button
                onClick={() => navigate("/edit-profile", { state: { ...userDetail } })}
                className="btn-primary text-sm"
              >
                <Pencil size={14} className="mr-2" /> Edit Profile
              </button>
              <Link to="/change-password" className="btn-secondary text-sm">
                <Lock size={14} className="mr-2" /> Change Password
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Details Card */}
      <div className="card">
        <h4 className="text-lg font-semibold text-gray-800 mb-5">Account Information</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Full Name</p>
            <p className="text-base font-semibold text-gray-800">{userDetail?.name || "—"}</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Email Address</p>
            <p className="text-base font-semibold text-gray-800">{userDetail?.email || "—"}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
