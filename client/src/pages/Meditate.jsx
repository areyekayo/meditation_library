import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";

function Meditate(){
    const {meditations} = useOutletContext();

    const formSchema = yup.object().shape({
        meditation: yup.string().required("Select a meditation"),
        completed_duration: yup.integer().required("Enter your meditation session time in minutes"),
        rating: yup.string().required("Rate your meditation session"),
        session_note: yup.string()
    });

    
}