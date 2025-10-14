import { useOutletContext, Link } from "react-router-dom";

function UserMeditationsList(){
    const {userMeditations} = useOutletContext();    


    return (
        <section className="list">
            <h3>Your Meditations</h3>
            {userMeditations.length > 0 ? (
                userMeditations.map((meditation) => (
                    <div key={meditation.id}>
                        <h4>
                            <Link to={`/meditations/${meditation.id}`}>{meditation.title}</Link>
                        </h4>
                    </div>))
            ) : (
                <p>You have no meditations with logged sessions yet. Add one below!</p>
            )
        }

        </section>
    )
}

export default UserMeditationsList