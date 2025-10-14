import { useOutletContext, Link } from "react-router-dom";

function MeditationCollection() {
    const {meditations} = useOutletContext();

    return(
        <div className="list">
            <h3>Available Meditations</h3>
            {meditations.map(meditation => (
                <>
                    <br />
                        <Link to={`/meditations/${meditation.id}`} key={meditation.id}>{meditation.title}</Link>
                    <br />
                </>
            ))}
        </div>
    )
}
export default MeditationCollection