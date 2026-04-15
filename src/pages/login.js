import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login({ setUser, darkMode }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const validUser = users.find(
      u => u.email === email && u.password === password
    );

    if (validUser) {
      setUser(validUser);
      localStorage.setItem("loggedUser", JSON.stringify(validUser));
      alert("Login Successful ✅");
      navigate("/");
    } else {
      alert("Invalid credentials ❌");
    }
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

        <h3 className="text-center mb-3">Welcome Back 👋</h3>

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



        <button className="btn btn-dark w-100" onClick={handleLogin}>
          Login
        </button>

        <p className="text-center mt-2">
          <Link to="/forgot">Forgot Password?</Link>
        </p>

        <p className="text-center">
          New user? <Link to="/register">Register</Link>
        </p>

      </div>
    </div>
  );
}

export default Login;