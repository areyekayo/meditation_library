import { useState, useContext } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { UserContext } from "../context/UserContext";


function UserMeditationSessionCard({id, session_timestamp, completed_duration, rating, session_note, onDeleteClick}) {

    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const {onSessionRefresh, onUpdateMeditationSession} = useContext(UserContext);
    const [successMessage, setSuccessMessage] = useState("");

    const formSchema = yup.object().shape({
        completed_duration: yup.number().required("Enter your session time in minutes"),
        rating: yup.number().required("Rate your session"),
        session_note: yup.string()
    });

    const formik = useFormik({
        initialValues: {
            completed_duration: completed_duration,
            rating: rating,
            session_note: session_note
        },
        validationSchema: formSchema,
        validateOnChagne: true,
        onSubmit: async (values) => {
            try {
                const session =  {
                    completed_duration: parseInt(values.completed_duration),
                    rating: parseInt(values.rating),
                    session_note: values.session_note
                };
                fetch(`/meditation_sessions/${id}`, {
                    method: "PATCH",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(session)
                }).then((res) => {
                    if (res.ok) {
                        res.json().then((updatedSession) => {
                            onUpdateMeditationSession(updatedSession);
                            setSuccessMessage("Session updated successfully!")
                            setTimeout(() => setSuccessMessage(""), 4000);
                            setTimeout(() => setShowUpdateForm(false), 4000);
                        })
                    }
                })
            }
            catch (error) {
                console.error("Form submission failed: ", error);
            }
        }
    })


    return (
        <div className="card">
            <h4>{session_timestamp}</h4>
            <p>You meditated for {completed_duration} minutes</p>
            <p>Your rating: {rating}</p>
            <p>Note: {session_note}</p>
            <button onClick={() => onDeleteClick(id)}>Delete</button>
            <br />
            <button className="button" onClick={() => setShowUpdateForm(!showUpdateForm)}>Edit</button> 
            {successMessage && <p style={{color: "green"}}>{successMessage}</p>}
            {showUpdateForm ? (
                <div>
                    <form onSubmit={formik.handleSubmit}>
                        <h4>Update duration</h4>
                        <br />
                        <input
                            type="number"
                            name="completed_duration"
                            onChange={e => formik.setFieldValue('completed_duration', Number(e.target.value))}
                            value={formik.values.completed_duration} />
                        
                        <h4>Update rating</h4>
                        <br />
                        <select name="rating"
                            onChange={formik.handleChange}
                            value={formik.values.rating}>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                        </select>

                        <h4>Update note</h4>
                        <br />
                        <textarea placeholder="Write a note about your meditation session." name="session_note" onChange={formik.handleChange} value={formik.values.session_note}/>
                        <br />
                        <button type="submit">Submit</button>
                            
                    </form>
                </div>
            ) : (
                <></>
            )}
            
        </div>
    )
}

export default UserMeditationSessionCard;