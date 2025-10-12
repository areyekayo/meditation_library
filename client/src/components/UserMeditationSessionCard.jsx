
function UserMeditationSessionCard({id, session_timestamp, completed_duration, rating, session_note, onDeleteClick}) {


    return (
        <div>

            <h4>{session_timestamp}</h4>
            <p>You meditated for {completed_duration} minutes</p>
            <p>Your rating: {rating}</p>
            <p>Note: {session_note}</p>
            <button onClick={() => onDeleteClick(id)}>Delete</button>
                        
        </div>
    )
}

export default UserMeditationSessionCard;