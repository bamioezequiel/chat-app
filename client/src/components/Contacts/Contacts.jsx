import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import "./Contacts.css";

export default function Contacts({ contacts, changeChat }) {
  const user = useSelector((state) => state.user);
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    setCurrentUserName(user.username);
    setCurrentUserImage(user.avatarImg);
  }, []);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };
  console.log(contacts)
  return (
    <div className="contacts-container">
      <div className="brand">
        <img src="" alt="" />
        <h3>snappy</h3>
      </div>
      <div className="contacts">
        {contacts.map((contact, index) => {
          return (
            <div
              key={contact._id}
              className={`contact ${
                index === currentSelected ? "selected" : ""
              }`}
              onClick={() => changeCurrentChat(index, contact)}
            >
              <div className="avatar">
                <img
                  src={`data:image/svg+xml;base64,${contact.avatarImg}`}
                  alt=""
                />
              </div>
              <div className="username">
                <h3>{contact.username}</h3>
              </div>
            </div>
          );
        })}
      </div>
      <div className="current-user">
        <div className="avatar">
          <img
            src={`data:image/svg+xml;base64,${currentUserImage}`}
            alt="avatar"
          />
        </div>
        <div className="username">
          <h2>{currentUserName}</h2>
        </div>
      </div>
    </div>
  );
}
