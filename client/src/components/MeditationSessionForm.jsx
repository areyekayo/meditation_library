import { useState, useContext } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { UserContext } from "../context/UserContext";
import { MeditationContext } from "../context/MeditationContext";

function MeditationSessionForm(){

    const {onSessionRefresh, onAddMeditationSession} = useContext(UserContext);
    const {meditations} = useContext(MeditationContext);
    const [successMessage, setSuccessMessage] = useState("");

    const formSchema = yup.object().shape({
        meditation: yup.string().required("Meditation is required"),
        completed_duration: yup.number().required("Please enter your session time in minutes"),
        rating: yup.number().required("Please enter a rating for your session"),
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
        onSubmit: (values, {resetForm}) => {
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
                        res.json().then((session) => {
                            //onSessionRefresh();
                            onAddMeditationSession(session)
                            resetForm();
                            setSuccessMessage("Meditation session created successfully!");
                            setTimeout(() => setSuccessMessage(""), 5000);
                        });
                    };
                });
            }
            catch (error) {
                console.error("Form submission failed: ", error);
            };
        }
    });

    return (
        <div className="new-entry-form">
            <form onSubmit={formik.handleSubmit}>
                <h3>Add A Session</h3>
                {successMessage && <p style={{color: "green"}}>{successMessage}</p>}
                <h4>Select a Meditation</h4>
                <select name="meditation" value={formik.values.meditation} onChange={formik.handleChange} onBlur={formik.handleBlur}>
                    <option value="" disabled>Select a meditation</option>
                    {meditations.map((meditation) => (
                        <option value={meditation.id} key={meditation.id}>{meditation.title}</option>
                    ))}
                </select>
                {formik.errors.meditation ? (<p style={{color: "red"}}>{formik.errors.meditation}</p>): (null) }

                <h4>Completed Duration</h4>
                <input 
                    type="number" 
                    name="completed_duration" 
                    onChange={e => formik.setFieldValue('completed_duration', Number(e.target.value))}
                    value={formik.values.completed_duration}
                    onBlur={formik.handleBlur} />
                {formik.errors.completed_duration ? (<p style={{color: "red"}}>{formik.errors.completed_duration}</p>) : (null) }

                <h4>Rate Your Session</h4>
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
                {formik.errors.rating ? (<p style={{color: "red"}}>{formik.errors.rating}</p>) : (null)}

                <h4>Note</h4>
                <textarea placeholder="Write a note about your meditation session." name="session_note" onChange={formik.handleChange} value={formik.values.session_note}/>

                <button type="submit" disabled={!formik.isValid || formik.isSubmitting}>Add Session</button>
            </form>
        </div>
    )

};

export default MeditationSessionForm;