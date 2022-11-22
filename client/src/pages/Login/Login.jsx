import { useState } from "react";
import { useDispatch } from "react-redux";
import { AiFillWechat } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useEffect } from "react";
import axios from "axios";
import "./Login.css";
import { getUser } from "../../redux/actions";

export default function Login() {
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
    const { username, password } = input;

    if (username === "") {
      toast.error("Username and Password is required.", toastOptions);
      return false;
    } else if (password === "") {
      toast.error("Username and Password is required.", toastOptions);
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
        "/login",
        {
          username,
          password,
        },
        { withCredentials: true }
      );

      if (data) {
        if (data.errors) {
          const { username, password } = data.errors;
          if (username) toast.error(username, toastOptions);
          else if (password) toast.error(password, toastOptions);
        } else {
          dispatch(getUser());
          navigate("/");
        }
      }
    }
  };

  return (
    <div className="login-container">
      <div className="left">
        <AiFillWechat size="20em" />
      </div>
      <div className="right">
        <form onSubmit={(e) => handleSubmit(e)} className="login-form">
          <h2>Log In</h2>
          <input
            type="text"
            name="username"
            placeholder="Username..."
            onChange={(e) => handleChange(e)}
          />

          <input
            type="password"
            name="password"
            placeholder="Password..."
            onChange={(e) => handleChange(e)}
          />

          <button type="submit">Log In</button>
          <span>
            Don't have an account ? <Link to="/signup">Sign In</Link>
          </span>
        </form>
      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
}
