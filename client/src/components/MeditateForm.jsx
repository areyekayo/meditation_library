import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";

function MeditateForm(){

    const {meditations, onMeditation} = useOutletContext();

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
        onSubmit: (values) => {
            console.log("Submitting form with values:", values);
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
                if (res.status === 201) {
                    res.json().then(newMeditationSession => (onMeditation(newMeditationSession)))
                }
                else if (res.status === 422) {
                    res.json().then(errorData => {
                        console.log("errors", errorData)
                    })
                }
            })
        }
    });

    return (
        <div>

            <form onSubmit={formik.handleSubmit}>
                <h1>Meditate</h1>
                <h2>Select a Meditation</h2>
                <br />
                <select name="meditation" value={formik.values.meditation} onChange={formik.handleChange}>
                    <option value="" disabled>Select a meditation</option>
                    {meditations.map((meditation) => (
                        <option value={meditation.id} key={meditation.id}>{meditation.title}</option>
                    ))}
                </select>
                <br />
                
                <h2>Completed Duration</h2>
                <br />
                <input type="number" name="completed_duration" onChange={formik.handleChange} value={formik.values.completed_duration} />
                <br />

                <h2>Rate Your Session</h2>
                <br />
                <select name="rating" onChange={formik.handleChange} value={formik.values.rating}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>

                <h2>Leave a note</h2>

                <textarea placeholder="Write a note about your meditation session." name="session_note" onChange={formik.handleChange} value={formik.values.session_note}/>

                <br />

                <button type="submit">Log Meditation</button>

            </form>
        </div>
    )

};

export default MeditateForm;