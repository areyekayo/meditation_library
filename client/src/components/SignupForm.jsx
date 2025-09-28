import {useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

function SignupForm() {
    const [refreshPage, setRefreshPage] = useState(false);

    // useEffect(() => {
    //     fetch("/users")
    //     .then((r) => r.json())
    //     .then((data) => {
    //         setUsers(data);

    //     });
    // }, [refreshPage]);

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
            fetch("/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values, null, 2),
            }).then((res) => {
                if (res.status == 200) {
                    setRefreshPage(!refreshPage);
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
                    onChange={formik.handleChange}
                    value={formik.values.password}    
                />
                <p style={{color: "red"}}> {formik.errors.password}</p>
            </form>
        </div>
    )
}

export default SignupForm;