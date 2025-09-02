import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MailIcon, LockIcon } from "lucide-react";

export default function LoginForm() {
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    const password = e.target.password.value;

    try {
      const res = await fetch("http://localhost:8000/api/v1/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Invalid email or password");

      // Save email for OTP page
      localStorage.setItem("pendingEmail", data.email);

      alert("OTP sent to your email!");
      navigate("/verifyotp"); // go to OTP page
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
        <p className="text-gray-600">Login to your VidBridge account</p>
      </div>
      <form onSubmit={handleLogin} className="space-y-6">
        {/* Email */}
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="flex items-center gap-2 text-sm font-medium text-gray-700"
          >
            <MailIcon className="h-4 w-4 text-gray-500" /> Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="m@example.com"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="space-y-2">
          <label
            htmlFor="password"
            className="flex items-center gap-2 text-sm font-medium text-gray-700"
          >
            <LockIcon className="h-4 w-4 text-gray-500" /> Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>

        {error && <p className="text-sm text-red-500 text-center">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 font-semibold"
        >
          Login
        </button>
      </form>

      <div className="text-center text-sm text-gray-600 mt-6">
        Don’t have an account?{" "}
        <Link
          to="/signup"
          className="underline text-blue-600 hover:text-blue-700"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}
