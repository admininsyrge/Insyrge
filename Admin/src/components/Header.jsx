import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/slices/AdminDetails";
import { BASE_URL_ADMIN, USER_DETAILS } from "../API";
import { toast } from "react-toastify";
import axios from "axios";
import { getImageUrl, handleImageError } from "../utils/imageUtils";
import { Bell } from "lucide-react";

function Header() {
  const token = localStorage.getItem("token");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const userStateDetail = useSelector((state) => state.user.user);

  useEffect(() => {
    if (!userStateDetail) {
      getDetail();
    }
  }, []);

  const getDetail = async () => {
    try {
      setIsLoading(true);
      const headers = { Token: token };
      const response = await axios.get(BASE_URL_ADMIN + USER_DETAILS, { headers });
      if (response.data.code === 200 && response.status === 200) {
        dispatch(setUser(response.data.data[0]));
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <nav className="h-[72px] bg-white border-b border-gray-200 px-8 flex items-center justify-between sticky top-0 z-30 shadow-sm">
      {/* Left side — Page context */}
      <div className="flex items-center gap-3">
        <h1 className="text-lg font-semibold text-gray-800">
          Admin Panel
        </h1>
      </div>

      {/* Right side — User info */}
      <div className="flex items-center gap-5">
        {/* Notification bell */}
        <button className="relative p-2 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 rounded-full ring-2 ring-white" />
        </button>

        {/* Divider */}
        <div className="w-px h-8 bg-gray-200" />

        {/* User profile */}
        <Link to="/profile" className="flex items-center gap-3 hover:bg-gray-50 rounded-xl px-3 py-1.5 transition-colors -mr-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-gray-800 leading-tight">{userStateDetail?.name || "Admin"}</p>
            <p className="text-xs text-gray-500 leading-tight">Administrator</p>
          </div>
          <img
            src={getImageUrl(userStateDetail?.image)}
            alt="User"
            className="w-10 h-10 rounded-full object-cover ring-2 ring-emerald-100 hover:ring-emerald-300 transition-all"
            onError={handleImageError}
          />
        </Link>
      </div>
    </nav>
  );
}

export default Header;
