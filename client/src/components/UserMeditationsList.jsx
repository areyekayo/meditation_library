import { useOutletContext, Link } from "react-router-dom";

function UserMeditationsList(){
    const {userMeditations} = useOutletContext();    


    return (
        <section>
            <h3>Your Meditations</h3>
            {userMeditations ? (
                userMeditations.map((meditation) => (
                    <div key={meditation.id}>
                        <h4>
                            <Link to={`/meditations/${meditation.id}`}>{meditation.title}</Link>
                        </h4>
                    </div>))
            ) : (
                <p>You have no meditations</p>
            )
        }

        </section>
    )
}

export default UserMeditationsList