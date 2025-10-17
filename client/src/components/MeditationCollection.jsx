import { Link } from "react-router-dom";
import { useContext } from "react";
import MeditationForm from "./MeditationForm";
import { MeditationContext } from "../context/MeditationContext";

function MeditationCollection() {
    const {meditations} = useContext(MeditationContext);

    return(
        <>
        <div className="list">
            <h3>Available Meditations</h3>
            {meditations.map(meditation => (
                <h4 key={meditation.id}>
                    <Link to={`/meditations/${meditation.id}`} key={meditation.id}>{meditation.title}</Link>
                </h4>
            ))}
        </div>
        <MeditationForm />
        
        </>
    )
}
export default MeditationCollection