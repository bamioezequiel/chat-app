import React from "react";
import { useSelector } from "react-redux";
import "./Welcome.css";

export default function Welcome() {
  const user = useSelector( (state) => state.user );
  return <div className="welcome-container">
    <img src="" alt="" />
    <h2>Welcome, <span>{user.username}</span></h2>
    <h3>Please select a chat to Start messaging</h3>
  </div>;
}
