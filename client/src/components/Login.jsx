import { useFormik } from "formik";
import * as yup from "yup";
import { useOutletContext } from "react-router-dom";

function Login() {
    const {onLogin} = useOutletContext()

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
            fetch("/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(values),
            }).then((res) => {
                if (res.status == 200) {
                    res.json().then(user => onLogin(user))
                } else {
                    res.json().then(errorData => {
                        formik.setFieldError('username', errorData.error || "Login failed");
                        formik.setFieldError("password", errorData.error);
                    })

                }
            });
        },
    });
    return (
        <div>
            <form onSubmit={formik.handleSubmit} style={{margin: "30px"}}>
                <label htmlFor="username">Username</label>
                <br />
                <input
                    id="username"
                    name="username"
                    onChange={formik.handleChange}
                    value={formik.values.username} 
                />
                <p style={{color: "red"}}> {formik.errors.username}</p>
                <label htmlFor="name">Password</label>
                <br />
                <input 
                    id="password"
                    name="password"
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}    
                />
                <p style={{color: "red"}}> {formik.errors.password}</p>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}
        
export default Login;