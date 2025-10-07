import { useOutletContext } from "react-router-dom";

function UserMeditationSessionCard({}) {
    const [meditationSessions] = useOutletContext()

    return (
        <div>
            {meditationSessions.map((meditation) => (
                <div>
                    <h2>{meditation.title}</h2>
                    <p>Type: {meditation.type}</p>
                    {meditation.meditation_sessions.map((session) => (
                        <div>
                        <h3>{session.session_timestamp}</h3>
                        <p>You meditated for {session.completed_duration} minutes</p>
                        <p>Your rating: {session.rating}</p>
                        <p>{session.session_note}</p>
                        </div>
                    ))}
 
                </div>
            ))}
        </div>
    )
}

export default UserMeditationSessionCard;