import { useOutletContext, Link, useParams } from "react-router-dom"

function MeditationCard(){
    const {meditations, meditationSessions} = useOutletContext()
    const {id} = useParams();
    const medId = parseInt(id, 10);
    
    const meditation = meditations.find((m) => m.id == medId)

    const userSessions = meditationSessions ? meditationSessions.filter((session) => session.meditation_id == id) : [];

    return (
        <div>
            <h2>{meditation.title}</h2>
            <p>Type: {meditation.type}</p>
            <p>{meditation.duration} minutes</p>
            <p>{meditation.instructions}</p>

            <h3>Your sessions with this meditation</h3>
            {userSessions.length > 0 ? (
                userSessions.map((session) => (
                    <div>
                         <Link key={session.id} to={`/meditation_sessions/${session.id}`}>{session.session_timestamp}</Link>
                    </div>
                ))
            ) : (
                <p>No sessions logged</p>
            )
            }
        </div>
    )
}

export default MeditationCard;