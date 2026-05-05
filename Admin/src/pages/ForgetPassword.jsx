import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL_ADMIN, FORGOT_PASSWORD } from "../API";
import Loader from "../components/Loader";

function ForgetPassword() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = async (data) => {
    setIsLoading(true);
    try {
      const response = await axios.put(BASE_URL_ADMIN + FORGOT_PASSWORD, data);
      if (response.data.code === 200 && response.data.status === true) {
        toast.success(response.data.data);
        navigate("/login");
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 lg:p-10">
          <div className="text-center mb-8">
            <img src="/logo.png" alt="Insyrge" className="h-12 mx-auto mb-6 cursor-pointer" onClick={() => navigate("/")} />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Forgot Password</h2>
            <p className="text-gray-500 text-sm">Don't worry, we'll help you recover your password</p>
          </div>

          <form onSubmit={handleSubmit(submitHandler)} className="space-y-5">
            <div>
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-input"
                placeholder="Enter Your Email Address"
                {...register("email", { required: true })}
              />
              {errors.email && <span className="error-text">E-mail is required</span>}
            </div>

            <button type="submit" className="w-full py-3 bg-brand-900 text-white rounded-xl font-semibold hover:bg-black transition-colors">
              Reset Password
            </button>

            <div className="text-center">
              <Link to="/" className="text-sm text-gray-500 hover:text-brand-900 transition-colors">
                ← Back to Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default ForgetPassword;
