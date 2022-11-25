import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import Chat from "./pages/Chat/Chat";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useState } from "react";
import { getUser } from "./redux/actions";
import { useCookies } from "react-cookie";
import SetAvatar from "./pages/SetAvatar/SetAvatar";
/* axios.defaults.baseURL = "http://localhost:3001"; */
axios.defaults.baseURL = "https://chat-app-ezequiel-bamio.onrender.com";

function App() {
  const dispatch = useDispatch();
  const [cookies] = useCookies([]);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const verifyUser = async () => {
      if (cookies.jwt) {
        const { data } = await axios.post(
          "http://localhost:3001/auth/verifyUser",
          {},
          { withCredentials: true }
        );
        if (data.status) {
          const loadUser = async () => {
            if (!Object.keys(user).length) {
              await dispatch(getUser());
            }
          };
          loadUser();
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
          <Route path="/setAvatar" element={<SetAvatar />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
