import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL_ADMIN, LOGIN } from "../API";
import Loader from "../components/Loader";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

function Login() {
  const token = localStorage.getItem("token");
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    const storedPassword = localStorage.getItem("password");
    if (storedEmail) setValue("email", storedEmail);
    if (storedPassword) setValue("password", storedPassword);
  }, []);

  useEffect(() => {
    if (token) navigate("/projects");
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
        const accessToken = response.data.data.user_details.access_token;
        localStorage.setItem("token", accessToken);
        navigate("/projects");
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
      <div className="min-h-screen flex">
        {/* Left Panel — Brand */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-gray-900 via-gray-800 to-black items-center justify-center p-12 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-20 w-72 h-72 bg-emerald-400 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
          </div>
          <div className="relative z-10 text-center">
            <img src="/logo.png" alt="Insyrge" className="w-80 mx-auto drop-shadow-2xl" />
          </div>
        </div>

        {/* Right Panel — Form */}
        <div className="flex-1 flex items-center justify-center p-8 lg:p-16 bg-white">
          <div className="w-full max-w-md">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Log in to your account</h2>
            <p className="text-gray-500 mb-8">Welcome back! Please fill the information below:</p>

            <form onSubmit={handleSubmit(submitHandler)} className="space-y-5">
              {/* Email */}
              <div>
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  className="form-input"
                  placeholder="Enter Your Username or Email Address"
                  {...register("email", { required: true })}
                />
                {errors.email && <span className="error-text">E-mail is required</span>}
              </div>

              {/* Password */}
              <div>
                <label className="form-label">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-input pr-10"
                    placeholder="Enter Your Password"
                    onKeyDown={(e) => { if (e.key === " ") e.preventDefault(); }}
                    {...register("password", {
                      required: "Password is required",
                      maxLength: { value: 25, message: "Password must be less than 25 characters" },
                      pattern: { value: /^\S*$/, message: "Password should not contain spaces" },
                    })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="password-toggle"
                  >
                    {showPassword ? <AiOutlineEyeInvisible size={18} /> : <AiOutlineEye size={18} />}
                  </button>
                </div>
                {errors.password && <span className="error-text">{errors.password.message || "Password is required"}</span>}
              </div>

              {/* Remember + Forgot */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-600">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-300 text-brand-900 focus:ring-brand-900"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                  />
                  Remember Me
                </label>
                <Link to="/forgotpassword" className="text-sm text-brand-900 font-medium hover:underline">
                  Forgot Password?
                </Link>
              </div>

              {/* Submit */}
              <button type="submit" className="w-full py-3 bg-brand-900 text-white rounded-xl font-semibold text-base hover:bg-black transition-colors">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
