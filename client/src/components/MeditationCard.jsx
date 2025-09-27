function MeditationCard({title, type, duration, instructions}){
    return (
        <div>
            <h2>{title}</h2>
            <p>Type: {type}</p>
            <p>{duration} minutes</p>
            <p>{instructions}</p>
        </div>
    )
}

export default MeditationCard