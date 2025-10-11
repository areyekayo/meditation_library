import { useOutletContext } from "react-router-dom";
import { useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";

function MeditateForm(){

    const {meditations, onAddSession} = useOutletContext();
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessages, setErrorMessages] = useState({});

    const formSchema = yup.object().shape({
        meditation: yup.string().required("Select a meditation"),
        completed_duration: yup.number().required("Enter your meditation session time in minutes"),
        rating: yup.number().required("Rate your meditation session"),
        session_note: yup.string()
    });

    const formik = useFormik({
        initialValues: {
            meditation: "",
            completed_duration: "",
            rating: "",
            session_note: "",
        },
        validationSchema: formSchema,
        validateOnChange: true,
        onSubmit: async (values, {resetForm}) => {
            try {
                const newSession = {
                    meditation: parseInt(values.meditation),
                    completed_duration: parseInt(values.completed_duration),
                    rating: parseInt(values.rating),
                    session_note: values.session_note
                };
                fetch("/meditation_sessions", {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(newSession),
                }).then((res) => {
                    if (res.ok) {
                        res.json().then(() => {
                            onAddSession()
                            resetForm();
                            setSuccessMessage("Meditation session logged successfully!");
                            setTimeout(() => setSuccessMessage(""), 5000);
                        })
                    }
                    else {
                        const errorData = res.json()
                        const errors = {};
                        if (errorData.errors?.meditation){
                            errors.meditation = errorData.erros.meditation[0];
                        }
                        if (errorData.errors?.completed_duration){
                            errors.completed_duration = errorData.errors.completed_duration[0];
                        }
                        if (errorData.errors?.rating) {
                            errors.rating = errorData.errors.rating[0];
                        }
                        setErrorMessages(errors)
                    }
                })
            }
            catch (error) {
                console.error("Form submission failed: ", error);
            }
        }
    });

    const getError = (field) => {
        if (errorMessages[field]) return errorMessages[field];
        if (formik.touched[field] && formik.errors[field]) return formik.errors[field]
        return null
    }

    return (
        <div>

            <form onSubmit={formik.handleSubmit}>
                <h3>Add A Session</h3>
                
                <h4>Select a Meditation</h4>
                <br />
                <select name="meditation" value={formik.values.meditation} onChange={formik.handleChange} onBlur={formik.handleBlur}>
                    <option value="" disabled>Select a meditation</option>
                    {meditations.map((meditation) => (
                        <option value={meditation.id} key={meditation.id}>{meditation.title}</option>
                    ))}
                </select>
                {getError("meditation") && <p style={{color: "red"}}>{getError("meditation")}</p>}
                <br />
                
                <h4>Completed Duration</h4>
                <br />
                <input 
                    type="number" 
                    name="completed_duration" 
                    onChange={e => formik.setFieldValue('completed_duration', Number(e.target.value))}
                    value={formik.values.completed_duration}
                    onBlur={formik.handleBlur} />
                <br />

                {getError("completed_duration") && <p style={{color: "red"}}>{getError("completed_duration")}</p>}

                <h4>Rate Your Session</h4>
                <br />
                <select name="rating" 
                    onChange={formik.handleChange} 
                    value={formik.values.rating}
                    onBlur={formik.handleBlur}>
                        <option value="" disabled>Select a rating</option>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                </select>

                {getError("rating") && <p style={{color: "red"}}>{getError("rating")}</p>}

                <h4>Leave a note</h4>

                <textarea placeholder="Write a note about your meditation session." name="session_note" onChange={formik.handleChange} value={formik.values.session_note}/>

                <br />
                {successMessage && <p style={{color: "green"}}>{successMessage}</p>}
                <br />
                <button type="submit" disabled={!formik.isValid || formik.isSubmitting}>Log Meditation</button>
            </form>
        </div>
    )

};

export default MeditateForm;