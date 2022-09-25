import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Register.css";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if (!email || !password || !repeatPassword) {
        return setError("One of the fields is empty");
      }

      if (
        !email
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )
      ) {
        return setError("Email is not a valid email");
      }
      if (password !== repeatPassword) {
        return setError("Password not the same");
      }
      if (password.length < 6 || repeatPassword.length < 6) {
        return setError("Password fields is less than 6 characters");
      }
      const res = await axios.post("/auth/register", {
        email,
        password,
      });

      if (res.data) {
        alert("Account registered successfully");
      }
      res.data && window.location.replace("/login");
    } catch (err: any) {
      return alert(err.response.data || "There is an error");
    }
  };
  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="text"
          className="registerInput"
          placeholder="Enter your email..."
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <label>Password</label>
        <input
          type="password"
          className="registerInput"
          placeholder="Enter your password..."
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <label>Confirm Password</label>
        <input
          type="password"
          className="registerInput"
          placeholder="Confirm your password..."
          onChange={(e) => {
            setRepeatPassword(e.target.value);
          }}
        />
        <button className="registerButton" type="submit">
          Register
        </button>
      </form>
      <button className="registerLoginButton">
        <Link className="link" to="/login">
          Login
        </Link>
      </button>
      {error && (
        <span style={{ color: "red", marginTop: "10px" }}>
          {error || "Something went wrong"}
        </span>
      )}
    </div>
  );
}
