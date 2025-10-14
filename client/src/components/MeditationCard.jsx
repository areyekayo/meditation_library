import { useOutletContext, useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import UserMeditationSessionCard from "./UserMeditationSessionCard";

function MeditationCard(){
    const {user, meditations, userMeditations, onSessionRefresh} = useOutletContext();
    const [sessions, setSessions] = useState([]);
    const {id} = useParams();
    const medId = parseInt(id, 10);
    
    const meditation = meditations.find((m) => m.id === medId)

    const userMeditation = userMeditations.find((m) => m.id === medId)

    useEffect(() => {
        if (userMeditation){setSessions(userMeditation.meditation_sessions)}
    },[userMeditation])

    if (!meditation){
        return <p>Loading meditation...</p>
    }

    const handleDeleteSession = (sessionId) => {
        fetch(`/meditation_sessions/${sessionId}`, {
            method: "DELETE",
        }).then((r) => {
            if (r.ok){
                setSessions((sessions) => sessions.filter((session) => session.id !== sessionId));
                onSessionRefresh()
            }
        })
    }

    return (
        <>
        <div className="list">
            <h2>{meditation.title}</h2>
            <p>Type: {meditation.type}</p>
            <p>{meditation.duration} minutes</p>
            <p>{meditation.instructions}</p>

        </div>

            <h3>Sessions</h3>
            {user && sessions.length > 0 ? ( 
                sessions.map((session) => (
                    <UserMeditationSessionCard
                        key={session.id}
                        id={session.id}
                        completed_duration={session.completed_duration}
                        session_timestamp={session.session_timestamp}
                        rating={session.rating}
                        session_note={session.session_note}
                        onDeleteClick={handleDeleteSession}
                        meditation={meditation} />
                    ))
            ) : (
                <p>No sessions logged</p> //to do: add button to add session?
            ) 

        }
        </>
    )
}

export default MeditationCard;