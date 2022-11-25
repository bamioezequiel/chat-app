import { useEffect } from "react";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import axios from "axios";

import ChatContainer from "../../components/ChatContainer/ChatContainer";
import Contacts from "../../components/Contacts/Contacts";
import Welcome from "../../components/Welcome/Welcome";
import "./Chat.css";
import { useCookies } from "react-cookie";
import { getUser } from "../../redux/actions";

export default function Chat() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const socket = useRef();
  const [cookies] = useCookies([]);
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    if (!cookies.jwt) {
      navigate("/login");
    } else {
      const loadUser = async () => {
        await dispatch(getUser());
        setCurrentUser({...user});
      }
      loadUser();
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
/*       socket.current = io("http://localhost:3001"); */
      socket.current = io("https://chat-app-ezequiel-bamio.vercel.app");
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  useEffect( () => {
    const loadUsers = async () => {
      if (currentUser) {
        if (user.isAvatarImageSet) {
          const { data } = await axios.get(`/user/allUsers/${user._id}`);
          setContacts(data);
        } else {
          navigate("/setAvatar");
        }
      }
    };
    loadUsers();
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <div className="chat-container">
      <div className="container">
        <Contacts contacts={contacts} changeChat={handleChatChange} />
        {currentChat === undefined ? (
          <Welcome />
        ) : (
          <ChatContainer currentChat={currentChat} socket={socket} />
        )}
      </div>
    </div>
  );
}
