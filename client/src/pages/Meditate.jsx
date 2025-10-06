import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import MeditateForm from "../components/MeditateForm";

function Meditate(){
    const [showMeditateForm, setShowMeditateForm] = useState(true);

    const {meditationSessions} = useOutletContext();


    return (
        <>
            <div>
                <MeditateForm />
            </div>
        </>

    )
}
export default Meditate;