import {useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

function SignupForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    return (
        <h1>Sign up form</h1>
    )
}