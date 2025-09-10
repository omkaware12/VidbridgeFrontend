import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MailIcon, LockIcon } from "lucide-react";
import toast from "react-hot-toast";

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

      localStorage.setItem("pendingEmail", data.email);

      toast.success("OTP sent to your email!");
      navigate("/verifyotp");
    } catch (err) {
      toast.error(err.message);
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black font-roboto">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md text-white px-6"
      >
        {/* Company Branding */}
        <h1 className="text-center text-3xl font-bold mb-2 text-white">
          VidBridge
        </h1>
        <p className="text-center text-gray-400 mb-8">Sign in to continue</p>

        {/* Email */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="flex items-center gap-2 text-sm text-white"
          >
            <MailIcon className="h-4 w-4 text-white" /> Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="you@vidbridge.com"
            className="w-full bg-black text-white border border-white rounded-lg px-4 py-2 placeholder-gray-400 focus:outline-none focus:border-white"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label
            htmlFor="password"
            className="flex items-center gap-2 text-sm text-white"
          >
            <LockIcon className="h-4 w-4 text-white" /> Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            className="w-full bg-black text-white border border-white rounded-lg px-4 py-2 placeholder-gray-400 focus:outline-none focus:border-white"
            required
          />
        </div>

        {/* Error */}
        {error && (
          <p className="text-sm text-red-400 text-center mb-3">{error}</p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-white text-black rounded-lg font-semibold hover:bg-gray-200 transition"
        >
          Sign In →
        </button>

        {/* Footer */}
        <div className="text-center text-sm text-gray-400 mt-6">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="underline text-white hover:text-gray-300"
          >
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
}
