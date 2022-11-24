import React, { useState } from "react";
import "./ChatInput.css";
import { IoMdSend } from "react-icons/io";

export default function ChatInput({ handleSendMsg }) {
  const [msg, setMsg] = useState("");
  const handleSendChat = (e) => {
    e.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };
  return (
    <div className="chatInput-container">
      <form onSubmit={handleSendChat} className="input-container">
        <input
          type="text"
          placeholder="Type your message here"
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />
        <button type="submit">
          <IoMdSend />
        </button>
      </form>
    </div>
  );
}
