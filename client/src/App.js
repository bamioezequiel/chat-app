import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import Chat from "./pages/Chat/Chat";
import { useDispatch } from "react-redux";
import axios from "axios";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect } from "react";
import { getUser } from "./redux/actions";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";
axios.defaults.baseURL = "http://localhost:3001";

function App() {
  const dispatch = useDispatch();
  const [cookies] = useCookies([]);

  useEffect(() => {
    const verifyUser = async () => {
      if (cookies.jwt) {
        const { data } = await axios.post(
          "http://localhost:3001/verifyUser",
          {},
          { withCredentials: true }
        );
        if (data.status) {
          dispatch(getUser());
        }
      }
    };
    verifyUser();
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Chat />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
