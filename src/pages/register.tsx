import axios from "axios";
import { FormikProps, useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Form from "../components/Form";
import LoginRegisterLayout from "../components/LoginRegisterLayout";
import { registerValidation } from "../validation/registerValidation";

export type FormValueType = {
  email: string;
  password: string;
};

export default function Register() {
  const navigate = useNavigate();
  const formik: FormikProps<FormValueType> = useFormik<FormValueType>({
    initialValues: {
      email: "",
      password: "",
    },
    validate: registerValidation,
    onSubmit: async (values) => {
      try {
        let response = await axios({
          method: "post",
          url: `${
            import.meta.env.VITE_SERVER_URL
          }/api/v1/authenticate/register`,
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
          data: values,
        });
        if (response.data.status === "ok") {
          toast.success("Account Created Successfully!");
          navigate("/login");
        }
      } catch (err) {
        if (err instanceof Error) toast.error(err.message);
      }
    },
  });

  return (
    <LoginRegisterLayout>
      <h1 className="font-primary font-[600] text-lg mb-3.5">
        Join thousands of learners from around the world
      </h1>
      <p className="text-[#333] font-primary text-base mb-9">
        Master web development by making real-life projects. There are many
        paths for you to choose
      </p>

      <Form submitBtnText="Start Coding now" formik={formik} />

      <p className="text-center font-primary text-[#828282] mb-6 2xl:text-sm">
        Already a member?{" "}
        <Link to="/login" className="text-[#2F80ED]">
          Login
        </Link>
      </p>
    </LoginRegisterLayout>
  );
}
