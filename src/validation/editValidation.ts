type ErrorType = {
  email?: string;
  password?: string;
};

export const editValidation = (values: {
  name: string;
  bio: string;
  phone: string;
  email: string;
  password: string;
}) => {
  const errors: ErrorType = {};
  if (!values.email) {
    errors.email = "Email is Required!";
  }

  if (values.password !== "") {
    if (
      !/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/gm.test(
        values.password
      )
    ) {
      errors.password =
        "Password should contain at least one number, one special character and should be 6 to 16 characters long!";
    }
  }

  return errors;
};
