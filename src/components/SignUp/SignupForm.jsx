import React, { useState } from "react";

export default function SignupForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "creator",
    avatar: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const res = await fetch("http://localhost:8000/api/v1/user/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || data.message || "Signup failed");
        return;
      }
      setSuccess(data.message || "Signup successful!");
    } catch (err) {
      setError("Network error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-6">
      <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-12 items-center">
        {/* Left side - Form */}
        <section className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-10 max-w-md mx-auto w-full">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center shadow">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-gray-900 select-none">VidBridge</h1>
          </div>
          <h2 className="text-2xl font-bold mb-2">Sign up</h2>
          <form className="space-y-5" onSubmit={handleSubmit}>
            {error && <div className="text-red-600 font-medium">{error}</div>}
            {success && <div className="text-green-600 font-medium">{success}</div>}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                name="name"
                placeholder="Your full name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-lg border-gray-300 shadow focus:ring-blue-500 focus:border-blue-500 px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                placeholder="user@company.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-lg border-gray-300 shadow focus:ring-blue-500 focus:border-blue-500 px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Create a strong password"
                value={formData.password}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-lg border-gray-300 shadow focus:ring-blue-500 focus:border-blue-500 px-3 py-2"
              />
              <span className="text-xs text-gray-400">Minimum 6 characters.</span>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-lg border-gray-300 shadow focus:ring-blue-500 focus:border-blue-500 px-3 py-2"
              >
                <option value="creator">Creator</option>
                <option value="editor">Editor</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Avatar URL (optional)</label>
              <input
                type="text"
                name="avatar"
                placeholder="https://example.com/avatar.jpg"
                value={formData.avatar}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow focus:ring-blue-500 focus:border-blue-500 px-3 py-2"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
            >
              Sign Up
            </button>
          </form>
          <div className="my-4 text-center text-gray-500 font-medium">or</div>
          <button
            type="button"
            className="w-full py-2 px-4 border border-gray-300 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 transition"
            onClick={() => alert('Google sign-in not implemented')}
          >
            <img src="https://www.nichemarket.co.za/wp-content/uploads/2017/08/google-amp-fast-speed-travel-ss-1920.jpg" alt="Google" className="w-5 h-5" />
            Continue with Google
          </button>
          <p className="mt-4 text-xs text-gray-400 text-center">
            By signing up, you agree to our <a href="#" className="text-blue-600">Terms</a>, <a href="#" className="text-blue-600">Licensing</a> and <a href="#" className="text-blue-600">Privacy Policy</a>.
          </p>
          <p className="mt-2 text-sm text-center">
            Already have an account? <a href="/login" className="text-blue-600 font-medium">Log in</a>
          </p>
        </section>
        {/* Right side - Info */}
        <aside className="hidden lg:flex flex-col items-center justify-center">
          <blockquote className="text-lg text-gray-700 mb-6 max-w-md italic font-medium">
            “The scale, quality, and organisation of this platform is insane! Everything you need to spin up seamless collaboration between YouTube creators and video editors in no time.”
          </blockquote>
          <div className="flex items-center gap-3 mb-2">
            <span className="font-semibold text-blue-600">@jordanhughes</span>
            <span className="text-xs text-gray-400">Co-founder, VidBridge</span>
          </div>
          <div className="mb-4 text-gray-600 font-semibold">
            700,000+ creators & editors use VidBridge to collaborate faster.
          </div>
          <div className="flex gap-6">
            <img src="https://upload.wikimedia.org/wikipedia/commons/4/42/YouTube_icon_%282013-2017%29.png" alt="YouTube" className="w-10 h-10 rounded shadow" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Canva_icon_2021.svg" alt="Canva" className="w-10 h-10 rounded shadow" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/4/4c/Adobe_Corporate_Logo.png" alt="Adobe" className="w-10 h-10 rounded shadow" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png" alt="Notion" className="w-10 h-10 rounded shadow" />
          </div>
        </aside>
      </div>
    </div>
  );
}