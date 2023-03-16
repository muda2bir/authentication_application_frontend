import axios from "axios";
import { FormikProps, useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppSelector } from "../app/hooks";
import { UserObjectType } from "../app/slices/userSlice";
import CameraIcon from "../assets/camera.svg";
import DefaultAvatar from "../assets/default_avatar.svg";
import EditField from "../components/EditField";
import Header from "../components/Header";
import Modal from "../components/Modal";
import ProfileInfoLayout from "../components/ProfileInfoLayout";
import { editValidation } from "../validation/editValidation";

export type EditFormValueTypes = {
  name: string;
  bio: string;
  phone: string;
  email: string;
  password: string;
};

export default function Edit() {
  const userState = useAppSelector<UserObjectType>(
    (state) => state.userState.value
  );
  const [modal, setModal] = useState<boolean>(false);
  const navigate = useNavigate();
  const formik: FormikProps<EditFormValueTypes> = useFormik<EditFormValueTypes>(
    {
      initialValues: {
        name: userState.user.name,
        bio: userState.user.bio,
        phone: userState.user.phone,
        email: userState.user.email,
        password: "",
      },
      validate: editValidation,
      onSubmit: async (values) => {
        let filterObj = Object.fromEntries(
          Object.entries(values).filter(([_, v]) => v != "")
        );
        let userData = {
          ...userState.user,
          ...filterObj,
          picture: userState.user.picture,
        };

        let response = await axios({
          method: "put",
          url: `${import.meta.env.VITE_SERVER_URL}/api/v1/user/update`,
          data: userData,
          withCredentials: true,
        });
        if (response.data.status == "ok") {
          toast.success("Details updated successfully!");
          navigate("/");
        }
      },
    }
  );

  useEffect(() => {
    if (!userState.isAuthenticated) navigate("/");
  }, [userState]);

  return (
    <div className="relative">
      <Header
        username={userState.user.name}
        userPhoto={userState.user.picture}
      />
      <ProfileInfoLayout type="edit">
        <div id="heading" className="font-primary w-1/2 mb-6">
          <h2 className="text-black text-2xl mb-1">Change Info</h2>
          <p className="text-sm text-[#828282]">
            Changes will be reflected to every services
          </p>
        </div>
        <div
          id="img_container"
          className="flex items-center gap-5 text-sm text-[#828282] mb-6"
        >
          <div id="image_container" className="relative">
            <img
              src={
                userState.user.picture === ""
                  ? DefaultAvatar
                  : userState.user.picture
              }
              alt="Profile Photo"
              className="h-20 rounded-lg cursor-pointer"
              loading="lazy"
            />
            <div
              id="image_overlay"
              className="absolute top-0 left-0 right-0 bottom-0 bg-[#00000066] flex items-center justify-center rounded-lg cursor-pointer lg:bg-[#0000004d]"
              onClick={() => setModal(!modal)}
            >
              <img
                src={CameraIcon}
                alt="Upload"
                className="h-8 invert"
                loading="lazy"
              />
            </div>
          </div>

          <button className="font-primary" onClick={() => setModal(!modal)}>
            CHANGE PHOTO
          </button>
        </div>

        <form
          className="flex flex-col gap-4 md:w-9/12"
          onSubmit={formik.handleSubmit}
        >
          <EditField name="name" formik={formik} />
          <EditField name="bio" formik={formik} />
          <EditField name="phone" formik={formik} />
          <EditField name="email" formik={formik} />
          <EditField name="password" formik={formik} />
          <button
            type="submit"
            onClick={() => {
              if (Object.keys(formik.errors).length !== 0) {
                toast.error(Object.values(formik.errors)[0]);
              }
            }}
            className="bg-[#2F80ED] text-white w-full text-base font-primary font-[600] py-2 rounded-lg mt-3"
          >
            Save
          </button>
        </form>
      </ProfileInfoLayout>

      {/* Image Upload Modal */}
      <Modal modal={modal} setModal={setModal} userState={userState} />
    </div>
  );
}
