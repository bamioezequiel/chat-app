import { useState } from "react";
import { useDispatch } from "react-redux";
import { AiFillWechat } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useEffect } from "react";
import axios from "axios";
import "./Signup.css";
import { getUser } from "../../redux/actions";

export default function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cookies] = useCookies([]);
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (cookies.jwt) {
      dispatch(getUser());
      navigate("/");
    }
  }, [cookies, navigate]);

  const toastOptions = {
    osition: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleValidation = () => {
    const { username, email, password, confirmPassword } = input;

    if (username.length < 3) {
      toast.error(
        "Username should be greater than 3 characters.",
        toastOptions
      );
      return false;
    } else if (password !== confirmPassword) {
      toast.error("Password an confirm password should be same.", toastOptions);
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Password should be equal or greater than 8 characters.",
        toastOptions
      );
      return false;
    } else if (email === "") {
      toast.error("Email is required.", toastOptions);
      return false;
    }

    return true;
  };

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const { username, email, password } = input;
      const { data } = await axios.post(
        "/auth/register",
        {
          username,
          email,
          password,
        },
        { withCredentials: true }
      );

      if (data) {
        if (data.errors) {
          const { username, email, password } = data.errors;
          if (username) toast.error(username, toastOptions);
          else if (email) toast.error(email, toastOptions);
          else if (password) toast.error(password, toastOptions);
        } else {
          await dispatch(getUser());
          navigate("/setAvatar");
        }
      }
    }
  };

  return (
    <div className="register-container">
      <div className="left">
        <AiFillWechat size="20em" />
      </div>
      <div className="right">
        <form onSubmit={(e) => handleSubmit(e)} className="register-form">
          <h2>Sign in</h2>
          <input
            type="text"
            name="username"
            placeholder="Username..."
            onChange={(e) => handleChange(e)}
          />

          <input
            type="email"
            name="email"
            placeholder="Email..."
            onChange={(e) => handleChange(e)}
          />

          <input
            type="password"
            name="password"
            placeholder="Password..."
            onChange={(e) => handleChange(e)}
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm password..."
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Sign in</button>
          <span>
            Already have an account ? <Link to="/login">Log In.</Link>
          </span>
        </form>
      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
}
