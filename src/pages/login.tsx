import axios from "axios";
import { FormikProps, useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Form from "../components/Form";
import LoginRegisterLayout from "../components/LoginRegisterLayout";
import { loginValidation } from "../validation/loginValidation";
import { FormValueType } from "./register";

export default function Login() {
  const navigate = useNavigate();
  const formik: FormikProps<FormValueType> = useFormik<FormValueType>({
    initialValues: {
      email: "",
      password: "",
    },
    validate: loginValidation,
    onSubmit: async (values) => {
      try {
        const response = await axios({
          method: "post",
          url: `${import.meta.env.VITE_SERVER_URL}/api/v1/authenticate/login`,
          data: values,
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        if (response.data.status === "ok") {
          toast.success("Successfully logged in");
          navigate("/");
        }
      } catch (err) {
        console.log(err);
        if (err instanceof Error) toast.error(err.message);
      }
    },
  });
  return (
    <LoginRegisterLayout>
      <h1 className="font-primary font-[600] text-lg mb-6">Login</h1>
      <Form submitBtnText="Login" formik={formik} />
      <p className="text-center font-primary text-[#828282] mb-6 2xl:text-sm">
        Don&apos;t have an account yet?{" "}
        <Link to="/register" className="text-[#2F80ED]">
          Register
        </Link>
      </p>
    </LoginRegisterLayout>
  );
}
