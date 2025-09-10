import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function SignupForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "creator",
    avatar: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8000/api/v1/user/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || data.message || "Signup failed");
        return;
      }

      toast.success(data.message || "Signup successful!");
      navigate("/login");
    } catch (err) {
      toast.error("Network error");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <form onSubmit={handleSubmit} className="w-full max-w-md text-white">
        {/* Company Name */}
        <h1 className="text-center text-3xl font-bold mb-2 font-roboto text-white">
          VidBridge
        </h1>
        <p className="text-center text-gray-400 mb-8 font-roboto">
          Create your account to get started
        </p>

        {/* Name */}
        <div className="mb-4 font-roboto">
          <label className="block mb-1 text-sm">Name *</label>
          <input
            type="text"
            name="name"
            placeholder="Your full name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-black border border-white rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block mb-1 text-sm">Email *</label>
          <input
            type="email"
            name="email"
            placeholder="user@company.com"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-black border border-white rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white"
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block mb-1 text-sm">Password *</label>
          <input
            type="password"
            name="password"
            placeholder="Create a strong password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-black border border-white rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white"
          />
          <p className="text-xs text-gray-400 mt-1">Minimum 6 characters</p>
        </div>

        {/* Role */}
        <div className="mb-4">
          <label className="block mb-1 text-sm">Role *</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-black border border-white rounded-lg text-white focus:outline-none focus:border-white"
          >
            <option value="creator">Creator</option>
            <option value="editor">Editor</option>
          </select>
        </div>

        {/* Avatar */}
        <div className="mb-6">
          <label className="block mb-1 text-sm">Avatar URL (optional)</label>
          <input
            type="text"
            name="avatar"
            placeholder="https://example.com/avatar.jpg"
            value={formData.avatar}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-black border border-white rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full py-3 bg-white text-black rounded-lg font-semibold hover:bg-gray-200 transition font-roboto"
        >
          Sign Up →
        </button>
      </form>
    </div>
  );
}
