import MeditationSessionForm from "../components/MeditationSessionForm";
import UserMeditationsList from "../components/UserMeditationsList";
import { useState } from "react";

function Meditate(){
    const [showSessionForm, setShowSessionForm] = useState(false);

    return (
        <>
            <div>
                <UserMeditationsList />
            </div>
            <div>
            <div className="centered-button">
                <button className="button" onClick={() => setShowSessionForm(!showSessionForm)}>Add A Session</button> 
            </div>

                {showSessionForm ? 
                    (<MeditationSessionForm />) 
                    : 
                    (<></>)}
                
            </div>
        </>

    )
}
export default Meditate;