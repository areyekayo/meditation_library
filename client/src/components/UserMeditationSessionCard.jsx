import { useOutletContext, useParams } from "react-router-dom";

function UserMeditationSessionCard({}) {
    const {meditationSessions} = useOutletContext()
    const {id} = useParams();
    const sessionId = parseInt(id, 10);

    const session = meditationSessions.find((s) => s.id == sessionId)

    //to do: add update and delete functionality

    return (
        <div>

            <h2>{session.meditation.title} session at {session.session_timestamp}</h2>
            <p>You meditated for {session.completed_duration} minutes</p>
            <p>Your rating: {session.rating}</p>
            <p>Note: {session.session_note}</p>
                        
        </div>
    )
}

export default UserMeditationSessionCard;