import { useOutletContext, Link } from "react-router-dom"

function MeditationCard({id, title, type, duration, instructions}){
    const {meditationSessions, user} = useOutletContext()

    const userSessions = meditationSessions.filter((session) => session.meditation_id == id)

    return (
        <div>
            <h2>{title}</h2>
            <p>Type: {type}</p>
            <p>{duration} minutes</p>
            <p>{instructions}</p>
            {meditationSessions ? (
                userSessions.map((session) => (
                    <Link to={`/meditation_sessions/${session.id}`}>{session.session_timestamp}</Link>
                ))
            ) : (
                <p>No sessions logged</p>
            )
            }
        </div>
    )
}

export default MeditationCard