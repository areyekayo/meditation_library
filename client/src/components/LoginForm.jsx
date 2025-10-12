import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useOutletContext } from "react-router-dom";

function LoginForm() {
  const { onLogin, onAddSession } = useOutletContext();
  const [backendErrors, setBackendErrors] = useState({});

  const formSchema = yup.object().shape({
    username: yup.string().required("Must enter username"),
    password: yup.string().required("Must enter password"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: formSchema,
    validateOnChange: true,
    onSubmit: async (values, { setErrors, setFieldValue }) => {
      try {
        const res = await fetch("/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });

        if (res.ok) {
          const user = await res.json();
          setBackendErrors({});
          onLogin(user);
          onAddSession()
        } else { //get back end errors if username not found or password is invalid
            const errorData = await res.json();
            const errors = {};
            if (errorData.errors?.username) {
              errors.username = errorData.errors.username[0];
            }
            if (errorData.errors?.password) {
              errors.password = errorData.errors.password[0];
            }
            setErrors(errors);
            setBackendErrors(errors);
            setFieldValue("password", "");
        }
      } catch (error) {
        console.error("Login request failed:", error);
      }
    },
  });

  // Custom error display logic prioritizing backend error if exists
  const getError = (field) => {
    if (backendErrors[field]) return backendErrors[field];
    if (formik.touched[field] && formik.errors[field]) return formik.errors[field];
    return null;
  };

  return (
    <div>
      <form onSubmit={formik.handleSubmit} style={{ margin: "30px" }}>
        <label htmlFor="username">Username</label>
        <br />
        <input
          id="username"
          name="username"
          onChange={(e) => {
            setBackendErrors({});
            formik.handleChange(e);
          }}
          onBlur={formik.handleBlur}
          value={formik.values.username}
        />
        <br />
        {getError("username") && <p style={{ color: "red" }}>{getError("username")}</p>}
        <br />
        <label htmlFor="password">Password</label>
        <br />
        <input
          id="password"
          name="password"
          type="password"
          onChange={(e) => {
            setBackendErrors({});
            formik.handleChange(e);
          }}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {getError("password") && <p style={{ color: "red" }}>{getError("password")}</p>}

        <br />
        <button type="submit" disabled={!formik.isValid || formik.isSubmitting}>
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginForm;