import React, { useState } from "react";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Buffer } from "buffer";
import axios from "axios";
import "./SetAvatar.css";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../redux/actions";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import { useCookies } from "react-cookie";

export default function SetAvatar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const API = "https://api.multiavatar.com/4645646";
  const [cookies] = useCookies([]);
  const [isLoading, setIsLoading] = useState(true);
  const [avatars, setAvatars] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const user = useSelector((state) => state.user);
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    if (!cookies.jwt) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    const loadAvatars = async () => {
      const data = [];
      for (let i = 0; i < 4; i++) {
        const image = await axios.get(
          `${API}/${Math.round(Math.random() * 1000)}`
        );
        const buffer = new Buffer(image.data);
        data.push(buffer.toString("base64"));
      }
      setAvatars(data);
      setIsLoading(false);
    };
    loadAvatars();
  }, []);

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar", toastOptions);
      return;
    }
    const { data } = await axios.post(`/user/setAvatar/${user._id}`, {
      image: avatars[selectedAvatar],
    });

    if (data.isSet) {
      await dispatch(getUser());
      navigate("/");
    } else {
      toast.error("Error setting avatar. Please try again", toastOptions);
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="setAvatar-container">
          <Loading />
        </div>
      ) : (
        <div className="setAvatar-container">
          <div className="title-container">
            <h2>Pick an Avatar as your profile picture</h2>
          </div>
          <div className="avatars">
            {avatars.map((avatar, index) => {
              return (
                <div
                  key={index}
                  className={`avatar ${
                    selectedAvatar === index ? "selected" : ""
                  }`}
                >
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatar"
                    key={avatar}
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              );
            })}
          </div>
          <button className="submit-btn" onClick={setProfilePicture}>
            Select
          </button>
          <ToastContainer />
        </div>
      )}
    </>
  );
}
