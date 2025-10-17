import { useFormik } from "formik";
import * as yup from "yup";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";

function SignupForm() {
    const {onLogin, onSessionRefresh} = useContext(UserContext)

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
        onSubmit: (values) => {
            fetch("/signup", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(values),
            }).then((res) => {
                if (res.status === 201) {
                    res.json().then(newUser => {
                        onLogin(newUser);
                        onSessionRefresh();
                    })
                } else if (res.status === 422) {
                    res.json().then(errorData => {
                        formik.setFieldError("username", errorData.errors.username[0])
                    });
                }
            });
        },
    });
    return (
        <div className="new-entry-form">
            <h4>Create An Account</h4>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="username">Username</label>
                <input
                    id="username"
                    name="username"
                    onChange={formik.handleChange}
                    value={formik.values.username} 
                />
                {formik.errors.username? (<p style={{color: "red"}}> {formik.errors.username}</p>) : (null)}
                <label htmlFor="name">Password</label>
                <input 
                    id="password"
                    name="password"
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}    
                />
                {formik.errors.password? (<p style={{color: "red"}}> {formik.errors.password}</p>) : (null) }
                <button type="submit">Sign Up</button>
            </form>
        </div>
    )
}

export default SignupForm;