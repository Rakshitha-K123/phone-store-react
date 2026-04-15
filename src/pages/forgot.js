import { useState } from "react";

function ForgotPassword() {

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");

  const sendOtp = () => {
    const randomOtp = Math.floor(1000 + Math.random() * 9000);
    setGeneratedOtp(randomOtp);
    alert("OTP (demo): " + randomOtp);
  };

  const verifyOtp = () => {
    if (otp == generatedOtp) {
      alert("OTP Verified ✅");
    } else {
      alert("Wrong OTP ❌");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h2>Forgot Password</h2>

      <input
        placeholder="Enter Email"
        className="form-control mb-2"
        onChange={(e) => setEmail(e.target.value)}
      />

      <button className="btn btn-primary w-100 mb-2" onClick={sendOtp}>
        Send OTP
      </button>

      <input
        placeholder="Enter OTP"
        className="form-control mb-2"
        onChange={(e) => setOtp(e.target.value)}
      />

      <button className="btn btn-success w-100" onClick={verifyOtp}>
        Verify OTP
      </button>
    </div>
  );
}

export default ForgotPassword;   // ✅ IMPORTANT