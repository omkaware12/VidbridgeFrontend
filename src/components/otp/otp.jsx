import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function OtpForm() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError(null);

    const email = localStorage.getItem("pendingEmail");

    try {
      const res = await fetch("http://localhost:8000/api/v1/user/verifyotp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "OTP verification failed");

      // Save JWT + user details
      localStorage.setItem("token", data.token);
      localStorage.setItem("name", data.name);
      localStorage.setItem("email", data.email);
      localStorage.setItem("role", data.role);
      localStorage.setItem("userId", data.id);

      toast.success("Login successful!");
      localStorage.removeItem("pendingEmail");
      navigate("/Dashboard");
    } catch (err) {
      toast.error(err.message);
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black font-roboto">
      <form
        onSubmit={handleVerifyOtp}
        className="w-full max-w-md text-white px-6"
      >
        {/* Branding */}
        <h1 className="text-center text-3xl font-bold mb-2 text-white">
          VidBridge
        </h1>
        <p className="text-center text-gray-400 mb-8">
          Enter the OTP sent to{" "}
          <span className="text-white font-semibold">
            {localStorage.getItem("pendingEmail")}
          </span>
        </p>

        {/* OTP Input */}
        <div className="mb-4">
          <label
            htmlFor="otp"
            className="flex items-center gap-2 text-sm text-white"
          >
            OTP Code
          </label>
          <input
            id="otp"
            name="otp"
            type="text"
            placeholder="Enter 6-digit OTP"
            className="w-full bg-black text-white border border-white rounded-lg px-4 py-2 placeholder-gray-400 focus:outline-none focus:border-white"
            required
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
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
          Verify OTP →
        </button>
      </form>
    </div>
  );
}
