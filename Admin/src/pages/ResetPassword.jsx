import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL_ADMIN, RESET_PASSWORD, CHECKSECURITYCODE } from "../API";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

function ResetPassword() {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const getSecurityCode = searchParams.get("security_code") || "";
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const token = localStorage.getItem("token");
  const newPassword = watch("newPassword");
  const [isLinkValid, setIsLinkValid] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => { if (token) navigate("/dashboard"); }, [token, navigate]);

  useEffect(() => {
    if (!getSecurityCode || getSecurityCode.trim() === "") {
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
        security_code: getSecurityCode, language: "ENGLISH",
      });
      setIsLinkValid(response.status === 200);
    } catch {
      setIsLinkValid(false);
    } finally {
      setLoading(false);
    }
  };

  const submitHandler = async (data) => {
    const formData = new FormData();
    formData.append("password", data?.newPassword);
    formData.append("confirmPassword", data?.confirmPassword);
    formData.append("security_code", getSecurityCode);
    try {
      const response = await axios.post(BASE_URL_ADMIN + RESET_PASSWORD, formData);
      toast.success(response?.data?.data?.message || "Password reset successful");
      navigate("/login");
    } catch (error) {
      toast.error(error?.response?.data?.error_description || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 lg:p-10">
        <div className="text-center mb-8">
          <img src="/logo.png" alt="Insyrge" className="h-12 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Reset Password</h2>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Validating your link...</p>
        ) : isLinkValid ? (
          <form onSubmit={handleSubmit(submitHandler)} className="space-y-5">
            <div>
              <label className="form-label">New Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-input pr-10"
                  placeholder="Enter New Password"
                  onKeyDown={(e) => { if (e.key === " ") e.preventDefault(); }}
                  {...register("newPassword", {
                    required: "This field is required",
                    maxLength: { value: 25, message: "Password must be less than 25 characters" },
                    pattern: {
                      value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/,
                      message: "Must be 8+ chars with uppercase, lowercase, number, and special char.",
                    },
                  })}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="password-toggle">
                  {showPassword ? <AiOutlineEye size={18} /> : <AiOutlineEyeInvisible size={18} />}
                </button>
              </div>
              {errors.newPassword && <p className="error-text">{errors.newPassword.message}</p>}
            </div>

            <div>
              <label className="form-label">Confirm New Password</label>
              <div className="relative">
                <input
                  type={showPassword1 ? "text" : "password"}
                  className="form-input pr-10"
                  placeholder="Confirm New Password"
                  onKeyDown={(e) => { if (e.key === " ") e.preventDefault(); }}
                  {...register("confirmPassword", {
                    required: "This field is required",
                    validate: (value) => value === newPassword || "Passwords must match.",
                  })}
                />
                <button type="button" onClick={() => setShowPassword1(!showPassword1)} className="password-toggle">
                  {showPassword1 ? <AiOutlineEye size={18} /> : <AiOutlineEyeInvisible size={18} />}
                </button>
              </div>
              {errors.confirmPassword && <p className="error-text">{errors.confirmPassword.message}</p>}
            </div>

            <button type="submit" className="w-full py-3 bg-brand-900 text-white rounded-xl font-semibold hover:bg-black transition-colors">
              Reset Password
            </button>
          </form>
        ) : (
          <div className="text-center">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-red-500 text-2xl">✕</span>
            </div>
            <h3 className="text-lg font-semibold text-red-600 mb-2">Link Expired</h3>
            <p className="text-gray-500 mb-4">Your password reset link has expired or is invalid.</p>
            <Link to="/forgotpassword" className="text-brand-900 font-medium hover:underline">
              Request a new reset link →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default ResetPassword;
