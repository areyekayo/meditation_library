import { useOutletContext, Link, useParams } from "react-router-dom"

function MeditationCard(){
    const {user, meditations, userMeditations} = useOutletContext()
    const {id} = useParams();
    const medId = parseInt(id, 10);
    
    const meditation = meditations.find((m) => m.id == medId)

    const userMeditation = userMeditations.find((m) => m.id === medId)

    const sessions = userMeditation ? userMeditation.meditation_sessions : [] ;

    return (
        <div>
            <h2>{meditation.title}</h2>
            <p>Type: {meditation.type}</p>
            <p>{meditation.duration} minutes</p>
            <p>{meditation.instructions}</p>

            <h3>Sessions</h3>
            {user && sessions.length > 0 ? ( 
                sessions.map((session) => (
                    <div>
                         <Link key={session.id} to={`/meditation_sessions/${session.id}`}>{session.session_timestamp}</Link>
                    </div>
                ))
            ) : (
                <p>No sessions logged</p> //to do: add button to add session?
            ) 

        }
        </div>)
}

export default MeditationCard;