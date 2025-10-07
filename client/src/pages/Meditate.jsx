import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import MeditateForm from "../components/MeditateForm";
import UserMeditationsList from "../components/UserMeditationsList";

function Meditate(){
    const [showMeditateForm, setShowMeditateForm] = useState(true);
    

    return (
        <>
            <div>
                <UserMeditationsList />
            </div>
            <div>
                <MeditateForm />
            </div>
        </>

    )
}
export default Meditate;