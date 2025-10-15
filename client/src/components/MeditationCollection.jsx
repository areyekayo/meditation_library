import { useOutletContext, Link } from "react-router-dom";
import MeditationForm from "./MeditationForm";
function MeditationCollection() {
    const {meditations} = useOutletContext();

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