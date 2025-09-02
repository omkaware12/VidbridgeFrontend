import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function OtpForm() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError(null);

    const email = localStorage.getItem("pendingEmail"); // stored in LoginForm

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
      localStorage.setItem("role" , data.role);

      alert("Login successful!");
      localStorage.removeItem("pendingEmail"); // cleanup
      navigate("/Dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Verify OTP</h2>
        <p className="text-gray-600">
          Enter the 6-digit OTP sent to <b>{localStorage.getItem("pendingEmail")}</b>
        </p>
      </div>

      <form onSubmit={handleVerifyOtp} className="space-y-6">
        <div className="space-y-2">
          <label
            htmlFor="otp"
            className="flex items-center gap-2 text-sm font-medium text-gray-700"
          >
            OTP Code
          </label>
          <input
            id="otp"
            name="otp"
            type="text"
            placeholder="Enter 6-digit OTP"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
            required
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        </div>

        {error && <p className="text-sm text-red-500 text-center">{error}</p>}

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 font-semibold"
        >
          Verify OTP
        </button>
      </form>
    </div>
  );
}
