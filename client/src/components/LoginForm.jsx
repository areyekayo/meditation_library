import { useState, useContext } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { UserContext } from "../context/UserContext";

function LoginForm() {
  const {onLogin} = useContext(UserContext);
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
        } else { //get back end errors if username not found or password is invalid
            const errorData = await res.json();
            if (errorData.errors?.login) {
              setErrors({login: errorData.errors.login[0]});
              setBackendErrors({login: errorData.errors.login[0]});
            }
            setFieldValue("password", "");
        }
      } catch (error) {
        console.error("Login request failed:", error);
      }
    },
  });

  // Custom error display logic prioritizing backend error if exists
  const getError = (field) => {
    if (backendErrors.login) return backendErrors.login;
    if (formik.touched[field] && formik.errors[field]) return formik.errors[field];
    return null;
  };

  return (
    <div className="new-entry-form">
      <h4>Log In</h4>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="username">Username</label>
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
        {getError("username") && <p style={{ color: "red" }}>{getError("username")}</p>}
        <label htmlFor="password">Password</label>
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
        <button type="submit" disabled={!formik.isValid || formik.isSubmitting}>
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginForm;