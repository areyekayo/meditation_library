import { useOutletContext, Link } from "react-router-dom";
import UserMeditationSessionCard from "./UserMeditationSessionCard";

function UserMeditationsList(){
    const {meditationSessions} = useOutletContext();

    return (
        <section>
            {meditationSessions.map((meditation) => (
                <div key={meditation.id}>
                    <h2>
                        <Link to={`/meditations/${meditation.id}`}>{meditation.title}</Link>
                    </h2>
                </div>))}
        </section>
    )
}

export default UserMeditationsList