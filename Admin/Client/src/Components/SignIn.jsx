import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let err = {};
    if (!form.email) err.email = "Email is required";
    if (!form.password) err.password = "Password is required";
    if (!isLogin && !form.name) err.name = "Name is required";
    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const submittingIsLogin = isLogin;
    setErrors({});
    setLoading(true);

    setTimeout(() => {
      console.log("Form Data:", form);
      setLoading(false);

      // Navigate to the admin dashboard after successful login.
      // Signup stays on the auth page (you can change this later if needed).
      if (submittingIsLogin) {
        navigate("/admin");
      }
    }, 1500);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2 bg-[#f9fafb]">

      {/* LEFT - AUTH */}
      <div className="flex items-center justify-center px-6 py-12 bg-white ">
        <div className="w-full max-w-sm">

          {/* Logo */}
          <h1 className="text-xl font-semibold text-gray-900 mb-8">
            YourBrand
          </h1>

          {/* Heading */}
          <h2 className="text-2xl font-semibold text-gray-900 mb-1">
            {isLogin ? "Sign in" : "Create account"}
          </h2>

          <p className="text-sm text-gray-500 mb-6">
            {isLogin
              ? "Enter your credentials to continue"
              : "Start your learning journey"}
          </p>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-4">

            {!isLogin && (
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Full name"
                  value={form.name}
                  onChange={handleChange}
                  className={`w-full border px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 ${
                    errors.name
                      ? "border-red-500 focus:ring-red-500"
                      : "focus:ring-indigo-500"
                  }`}
                />
                {errors.name && (
                  <p className="text-xs text-red-500 mt-1">{errors.name}</p>
                )}
              </div>
            )}

            <div>
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={form.email}
                onChange={handleChange}
                className={`w-full border px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 ${
                  errors.email
                    ? "border-red-500 focus:ring-red-500"
                    : "focus:ring-indigo-500"
                }`}
              />
              {errors.email && (
                <p className="text-xs text-red-500 mt-1">{errors.email}</p>
              )}
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className={`w-full border px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 ${
                  errors.password
                    ? "border-red-500 focus:ring-red-500"
                    : "focus:ring-indigo-500"
                }`}
              />

              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2 text-xs text-gray-500 cursor-pointer hover:text-indigo-600"
              >
                {showPassword ? "Hide" : "Show"}
              </span>

              {errors.password && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Options */}
            {isLogin && (
              <div className="flex justify-between text-sm text-gray-600">
                <label className="flex items-center gap-2">
                  <input type="checkbox" />
                  Remember me
                </label>
                <span className="text-indigo-600 cursor-pointer hover:underline">
                  Forgot password?
                </span>
              </div>
            )}

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-2.5 rounded-md text-sm font-medium hover:bg-indigo-700 transition disabled:opacity-70"
            >
              {loading
                ? "Please wait..."
                : isLogin
                ? "Sign in"
                : "Create account"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="px-2 text-xs text-gray-400">OR</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* Google */}
          <button className="w-full border py-2.5 rounded-md text-sm flex items-center justify-center gap-2 hover:bg-gray-50">
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              className="w-4 h-4"
              alt=""
            />
            Continue with Google
          </button>

          {/* Switch */}
          <p className="text-sm text-gray-500 mt-6 text-center">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <span
              onClick={() => setIsLogin(!isLogin)}
              className="ml-1 text-indigo-600 cursor-pointer font-medium"
            >
              {isLogin ? "Sign up" : "Login"}
            </span>
          </p>

        </div>
      </div>

     {/* RIGHT - PREMIUM SaaS HERO (NO BUTTON) */}
        <div className="hidden md:flex relative items-center overflow-hidden ">

            {/* Background Image */}
            <img
            src="https://images.unsplash.com/photo-1498050108023-c5249f4df085"
            alt=""
            className="absolute inset-0 w-full h-full object-cover scale-105"
            />

            {/* Smooth Gradient Overlay (left readable, right visible) */}
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-white/10"></div>

            {/* Subtle Color Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-100/40 to-transparent"></div>

            {/* Content */}
            <div className="relative z-10 max-w-xl px-16">

            {/* Tag */}
            <p className="text-sm text-indigo-600 font-semibold tracking-wide mb-5">
                🚀 Build • Launch • Scale
            </p>

            {/* Heading */}
            <h2 className="text-3xl lg:text-5xl font-semibold text-gray-900 leading-tight mb-6">
                Your own EdTech platform, simplified.
            </h2>

            {/* Description */}
            <p className="text-gray-600 text-lg leading-relaxed mb-10">
                Everything you need to create, manage, and grow your learning business — all in one powerful platform.
            </p>

            {/* Features */}
            <div className="space-y-4 text-sm">

                <div className="flex items-center gap-3 text-gray-700">
                <div className="w-2.5 h-2.5 bg-indigo-600 rounded-full"></div>
                Fully customizable web & mobile apps
                </div>

                <div className="flex items-center gap-3 text-gray-700">
                <div className="w-2.5 h-2.5 bg-indigo-600 rounded-full"></div>
                Integrated payments & user management
                </div>

                <div className="flex items-center gap-3 text-gray-700">
                <div className="w-2.5 h-2.5 bg-indigo-600 rounded-full"></div>
                Built to scale your education business
                </div>

            </div>

            </div>

            </div>

    </div>
  );
}