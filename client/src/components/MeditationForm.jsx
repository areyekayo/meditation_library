import { useState, useContext } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { MeditationContext } from "../context/MeditationContext";

function MeditationForm() {
    const {onAddMeditation} = useContext(MeditationContext)
    const [successMessage, setSuccessMessage] = useState("");

    const formSchema = yup.object().shape({
        title: yup.string().required("Enter a title for the meditation").min(5, "Title must be at least 5 characters").max(100, "Title must be less than 100 characters"),
        type: yup.string().required("Meditation type is required"),
        duration: yup.number().integer().required("Enter duration in minutes").min(1, "Duration must be at least 1 minute"),
        instructions: yup.string().required("Instructions are required")
    });

    const formik = useFormik({
        initialValues: {
            title: "",
            type: "",
            duration: "",
            instructions: "",
        },
        validationSchema: formSchema,
        validateOnChange: true,
        onSubmit: async (values, {resetForm}) => {
            try {
                const res = await fetch("/meditations", {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(values),
                });

                if (res.ok) {
                    const newMeditation = await res.json()
                    onAddMeditation(newMeditation)
                    resetForm();
                    setSuccessMessage("Meditation created successfully!");
                    setTimeout(() => setSuccessMessage(""), 5000);
                }
            }
            catch (error) { console.error("Form submission failed: ", error);}
        }
    });

    return (
        <div className="new-entry-form">
            <form onSubmit={formik.handleSubmit}>
                <h3>Add A Meditation to the Library</h3>

                {successMessage && <p style={{color: "green"}}>{successMessage}</p>}
                
                <h4>Select a Meditation Type</h4>
                <select 
                    name="type" 
                    value={formik.values.type}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur} 
                >
                    <option value="" disabled>Select a type</option>
                    <option value="Visualization">Visualization</option>
                    <option value="Body Scan">Body Scan</option>
                    <option value="Lovingkindness">Lovingkindness</option>
                    <option value="Mantra">Mantra</option>
                    <option value="Vipassana">Vipassana</option>
                </select>
                {formik.errors.type && <p style={{color: "red"}}>{formik.errors.type}</p>}
                
                <h4>Title</h4>
                <input 
                    type="text" 
                    name="title"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.title} />
                {formik.errors.title && <p style={{color: "red"}}>{formik.errors.title}</p>}

                <h4>Duration</h4>
                <input 
                    type="number"
                    name="duration"
                    onChange={e => formik.setFieldValue('duration', Number(e.target.value))}
                    value={formik.values.duration}
                    onBlur={formik.handleBlur} />
                {formik.errors.duration && <p style={{color: "red"}}>{formik.errors.duration}</p>}

                <h4>Instructions</h4>
                <textarea 
                    placeholder="Add instructions or guidance for this meditation." 
                    name="instructions" 
                    onChange={formik.handleChange} 
                    value={formik.values.instructions} 
                    onBlur={formik.handleBlur} />
                {formik.errors.instructions && <p style={{color: "red"}}>{formik.errors.instructions}</p>}

                <button type="submit" disabled={!formik.isValid || formik.isSubmitting}>Add Meditation</button>
                    
            </form>
        </div>
    )
    
};

export default MeditationForm