import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { updateUserState } from "../app/slices/userSlice";
import DefaultAvatar from "../assets/default_avatar.svg";
import DetailContainer from "../components/DetailContainer";
import Header from "../components/Header";
import Loading from "../components/Loading";
import ProfileInfoLayout from "../components/ProfileInfoLayout";

export default function Profile() {
  const userState = useAppSelector((state) => state.userState.value);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios({
      method: "get",
      url: `${import.meta.env.VITE_SERVER_URL}/api/v1/user`,
      withCredentials: true,
    })
      .then((response) => {
        if (response.data.status === "error") navigate("/login");
        const { user } = response.data;
        dispatch(
          updateUserState({
            isAuthenticated: true,
            user: {
              id: user._id,
              name: user.name,
              email: user.email,
              picture: user.picture,
              phone: user.phone,
              bio: user.bio,
              googleId: user.googleId,
              createdAt: user.createdAt,
              password: user.password,
            },
          })
        );
        setIsLoading(false);
      })
      .catch((error) => navigate("/login"));
  }, []);

  if (isLoading) return <Loading />;

  return (
    <div>
      <Header
        username={userState.user.name}
        userPhoto={userState.user.picture}
      />
      <div id="top_heading_container" className="mt-4 mb-12">
        <h1 className="text-2xl font-primary text-center xl:text-4xl xl:mb-2">
          Profile info
        </h1>
        <p className="text-sm font-primary text-center xl:text-lg">
          Basic info, like your name and photo
        </p>
      </div>
      <ProfileInfoLayout type="profile">
        <div
          id="container_header"
          className="flex items-center justify-between mb-5"
        >
          <div id="heading" className="font-primary w-1/2">
            <h2 className="text-black text-2xl mb-1">Profile</h2>
            <p className="text-sm text-[#828282]">
              Some info may be visible to other people
            </p>
          </div>
          <div id="buttonContainer">
            <button
              className="font-primary ml-auto text-base text-[#828282] border-[1px] border-[#828282] rounded-xl py-1.5 px-8 outline-none transition-all hover:bg-[#828282] hover:text-white"
              onClick={() => navigate("/edit_profile")}
            >
              Edit
            </button>
          </div>
        </div>

        <div id="user_details_container">
          <div
            id="photo_container"
            className="grid grid-cols-2 items-center py-4"
          >
            <span className="font-primary text-[#828282] text-sm">PHOTO</span>
            <img
              src={
                userState.user.picture === ""
                  ? DefaultAvatar
                  : userState.user.picture
              }
              alt="Profile Photo"
              className="h-20 rounded-lg justify-self-center md:justify-self-start"
              loading="lazy"
            />
          </div>
          <hr />
          <DetailContainer property="name" value={userState.user.name} />
          <DetailContainer property="bio" value={userState.user.bio} />
          <DetailContainer property="phone" value={userState.user.phone} />
          <DetailContainer property="email" value={userState.user.email} />
          <DetailContainer property="password" value="****************" />
        </div>
      </ProfileInfoLayout>
    </div>
  );
}
