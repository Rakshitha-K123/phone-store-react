import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register({ darkMode }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  const validatePassword = (pass) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(pass);
  };

  const handleRegister = () => {

    if (!username || !email || !password) {
      alert("Fill all fields ❌");
      return;
    }

    if (!validatePassword(password)) {
      alert("Password not strong ❌");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.find(u => u.email === email)) {
      alert("User already exists ❌");
      return;
    }

    users.push({ username, email, password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registered Successfully ✅");
    navigate("/login");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        backgroundColor: darkMode ? "#121212" : "#f8f9fa",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >

      <div
        className="card p-4 shadow"
        style={{
          width: "400px",
          borderRadius: "15px",
          backgroundColor: darkMode ? "#1e1e1e" : "white",
          color: darkMode ? "white" : "black"
        }}
      >

        <h3 className="text-center mb-3">Create Account ✨</h3>

        <input
  type="text"
  className="form-control mb-2 custom-input"
  placeholder="Username"
  onChange={(e) => setUsername(e.target.value)}
/>

<input
  type="email"
  className="form-control mb-2 custom-input"
  placeholder="Email"
  onChange={(e) => setEmail(e.target.value)}
/>

<input
  type="password"
  className="form-control mb-2 custom-input"
  placeholder="Password"
  onChange={(e) => setPassword(e.target.value)}
/>

        {/* PASSWORD RULES */}
        <div style={{ fontSize: "13px" }} className="mb-3">
          Password must contain:
          <ul>
            <li>At least 8 characters</li>
            <li>Uppercase (A-Z)</li>
            <li>Lowercase (a-z)</li>
            <li>Number (0-9)</li>
            <li>Special character (@$!%*?&)</li>
          </ul>
        </div>

        <button className="btn btn-success w-100" onClick={handleRegister}>
          Register
        </button>

        <p className="text-center mt-3">
          Already have account? <Link to="/login">Login</Link>
        </p>

      </div>
    </div>
  );
}

export default Register;