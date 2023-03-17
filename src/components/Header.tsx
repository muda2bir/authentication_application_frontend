import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppSelector } from "../app/hooks";
import arrow from "../assets/arrow.svg";
import DefaultAvatar from "../assets/default_avatar.svg";
import devChallengesLogo from "../assets/devchallenges.svg";
import groupIcon from "../assets/group_profile.svg";
import logoutIcon from "../assets/logout_icon.svg";
import profileIcon from "../assets/profile.svg";
import { useClickOutside } from "../hooks/useClickOutside";

type HeaderProps = {
  username: string;
  userPhoto: string;
};

export default function Header({ username, userPhoto }: HeaderProps) {
  const navigate = useNavigate();
  const currentUser = useAppSelector((state) => state.userState);
  const [toggleDropdown, setToggleDropdown] = useState<boolean>(false);
  const dropDownRef = useClickOutside(() => setToggleDropdown(false));

  return (
    <header className="w-11/12 mx-auto flex items-center justify-between py-3.5 lg:py-5">
      <Link to="/">
        <img
          src={devChallengesLogo}
          alt="devChallenges.io"
          className="h-5 lg:h-8 xl:h-6"
          loading="lazy"
        />
      </Link>
      <div
        id="profile_dropdown_container"
        className="relative md:flex md:items-center md:justify-end md:gap-2 lg:gap-4 xl:gap-3 cursor-pointer"
        onClick={() => setToggleDropdown(true)}
        ref={dropDownRef}
      >
        <img
          src={userPhoto === "" ? DefaultAvatar : userPhoto}
          alt="Profile Photo"
          className="h-9 rounded-lg ml-auto md:m-0 lg:h-12 xl:h-10"
          loading="lazy"
        />
        <span className="hidden md:inline font-primary text-xs font-bold lg:text-lg xl:text-sm">
          {username}
        </span>
        <img
          src={arrow}
          alt="down"
          className={`hidden md:inline-block h-6 lg:h-8 invert-[30%] sepia-[3%] saturate-[10%] hue-rotate-[350deg] brightness-[96%] contrast-[92%] ${
            toggleDropdown ? "rotate-180" : ""
          }`}
          loading="lazy"
        />

        <ul
          id="drop_down"
          className={`absolute top-[150%] right-0 bg-white w-56 lg:w-80 xl:w-64 p-3 rounded-xl shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] origin-top-right transition-all ${
            !toggleDropdown ? "scale-0" : ""
          }`}
        >
          <li className="w-full rounded-lg hover:bg-[#F2F2F2] p-2">
            <Link
              to="/"
              className="flex items-center gap-2 lg:gap-4 text-xs lg:text-lg xl:text-base font-primary text-[#4F4F4F] w-full"
            >
              <img
                src={profileIcon}
                alt=""
                className="h-5 lg:h-6 invert-[30%] sepia-[3%] saturate-[10%] hue-rotate-[350deg] brightness-[96%] contrast-[92%]"
                loading="lazy"
              />{" "}
              My Profile
            </Link>
          </li>
          <li className="w-full rounded-lg hover:bg-[#F2F2F2] p-2 mb-2">
            <Link
              to="/"
              className="flex items-center gap-2 lg:gap-4 text-xs font-primary lg:text-lg xl:text-base text-[#4F4F4F] w-full"
            >
              <img
                src={groupIcon}
                alt=""
                className="h-5 lg:h-6
                 invert-[30%] sepia-[3%] saturate-[10%] hue-rotate-[350deg] brightness-[96%] contrast-[92%]"
                loading="lazy"
              />
              Group Chat
            </Link>
          </li>
          <hr />
          <li
            className="w-full rounded-lg hover:bg-[#F2F2F2] p-2 mt-2"
            onClick={async () => {
              let response = await axios({
                method: "post",
                url: `${
                  import.meta.env.VITE_SERVER_URL
                }/api/v1/authenticate/logout`,
                withCredentials: true,
              });
              if (response.data.status === "ok") {
                toast.success("Logged out Successfully!");
                navigate("/login");
              } else {
                toast.error("Something went wrong!");
              }
            }}
          >
            <Link
              to="/"
              className="flex items-center lg:gap-4 gap-2 text-xs lg:text-lg xl:text-base font-primary text-[#FF0000] w-full"
            >
              <img
                src={logoutIcon}
                alt=""
                className="h-5 lg:h-6"
                loading="lazy"
              />{" "}
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
