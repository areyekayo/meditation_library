
function UserMeditationSessionCard({}) {

    return (
        <div>
            <h2>{meditation.title} on {session_timestamp}</h2>
            <p>Type: {meditation.type}</p>
            <p>You meditated for {completed_duration} minutes</p>
            <p>Your rating: {rating}</p>
            <p>{session_note}</p>
        </div>
    )
}

export default UserMeditationSessionCard;