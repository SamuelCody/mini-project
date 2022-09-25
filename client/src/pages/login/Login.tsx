import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Login.css";

export default function Login() {
  const emailRef = useRef<any>();
  const passwordRef = useRef<any>();

  const [error, setError] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!email || !password) {
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
    if (password.length < 6) {
      return setError("Password field is less than 6 characters");
    }

    try {
      await axios.post("/auth/login", {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });

      return alert("You are logged in");
    } catch (err: any) {
      return alert(err.response.data || "There is an error");
    }
  };
  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="text"
          className="loginInput"
          placeholder="Enter your email..."
          ref={emailRef}
        />
        <label>Password</label>
        <input
          type="password"
          className="loginInput"
          placeholder="Enter your password..."
          ref={passwordRef}
        />
        <button className="loginButton" type="submit">
          Login
        </button>
      </form>
      <button className="loginRegisterButton">
        <Link className="link" to="/register">
          Register
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
