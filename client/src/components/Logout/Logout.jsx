import React from "react";
import "./Logout.css";
import { BiPowerOff } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { cleanUser } from './../../redux/actions/index';

export default function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [cookies, setCookie, removeCookie] = useCookies();

  const handleClick = () => {
    removeCookie("jwt");
    dispatch(cleanUser());
    navigate("/login");
  };
  return (
    <button className="btn-logout" onClick={handleClick}>
      <BiPowerOff />
    </button>
  );
}
