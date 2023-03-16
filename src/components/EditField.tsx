import { FormikProps } from "formik";
import { EditFormValueTypes } from "../pages/edit";

type EditFieldProps = {
  name: "name" | "bio" | "phone" | "email" | "password";
  formik: FormikProps<EditFormValueTypes>;
};

export default function EditField({ name, formik }: EditFieldProps) {
  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <div id="field_container" className="flex flex-col gap-1">
      <label htmlFor="name" className="font-primary text-[#4f4f4f]">
        {capitalizeFirstLetter(name)}
      </label>
      {name !== "bio" ? (
        <input
          type={
            name == "email" ? "email" : name == "password" ? "password" : "text"
          }
          name={name}
          id={name}
          className="border-[1px] border-[#828282] font-primary rounded-lg p-3 outline-none"
          placeholder={`Enter your ${
            name === "password" ? `new ${name}` : name
          }...`}
          value={formik.values[name]}
          onChange={formik.handleChange}
        />
      ) : (
        <textarea
          name={name}
          id={name}
          className="border-[1px] border-[#828282] font-primary rounded-lg p-3 outline-none resize-none"
          placeholder={`Enter your ${name}...`}
          value={formik.values[name]}
          onChange={formik.handleChange}
        />
      )}
    </div>
  );
}
