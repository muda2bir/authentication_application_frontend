import { FormikProps } from "formik";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import googleIcon from "../assets/Google.svg";
import lockIcon from "../assets/lock.svg";
import mailIcon from "../assets/mail.svg";
import { FormValueType } from "../pages/register";

type FormProps = {
  submitBtnText: string;
  formik: FormikProps<FormValueType>;
};

export default function Form({ submitBtnText, formik }: FormProps) {
  const navigate = useNavigate();
  const redirectToGoogleSSO = () => {
    window.open(
      `${import.meta.env.VITE_SERVER_URL}/api/v1/authenticate/login/google`,
      "_self"
    );
    navigate("/");
  };

  return (
    <>
      <form
        id="login_register_form"
        className="mb-8"
        onSubmit={formik.handleSubmit}
      >
        <div
          id="input_boxes"
          className="border-[1px] border-[#bdbdbd] rounded-lg flex items-center px-3 mb-3.5"
        >
          <img
            src={mailIcon}
            alt="Email"
            className="invert-[45%] sepia-[10%] saturate-[12%] hue-rotate-[22deg] brightness-[102%] contrast-[85%] h-8 2xl:h-6"
            loading="lazy"
          />
          <input
            type="text"
            className="flex-1 font-primary text-base p-3 2xl:p-2 outline-none"
            placeholder="Email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
        </div>
        <div
          id="input_boxes"
          className="border-[1px] border-[#bdbdbd] rounded-lg flex items-center px-3 mb-5"
        >
          <img
            src={lockIcon}
            alt="Password"
            className="invert-[45%] sepia-[10%] saturate-[12%] hue-rotate-[22deg] brightness-[102%] contrast-[85%] h-8 2xl:h-6"
            loading="lazy"
          />
          <input
            type="password"
            className="flex-1 font-primary text-base p-3 2xl:p-2 outline-none"
            placeholder="Password"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
        </div>
        <button
          type="submit"
          onClick={() => {
            if (Object.keys(formik.errors).length !== 0) {
              toast.error(Object.values(formik.errors)[0]);
            }
          }}
          className="bg-[#2F80ED] text-white w-full text-base font-primary font-[600] py-2 rounded-lg"
        >
          {submitBtnText}
        </button>
      </form>
      <p className="text-center font-primary text-[#828282] mb-6">
        or continue with these social profile
      </p>
      <div
        id="social_icon_container"
        className="flex items-center justify-center mb-6"
      >
        <img
          src={googleIcon}
          alt="Google"
          className="cursor-pointer"
          onClick={redirectToGoogleSSO}
          loading="lazy"
        />
      </div>
    </>
  );
}
