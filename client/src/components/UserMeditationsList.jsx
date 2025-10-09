import { useOutletContext, Link } from "react-router-dom";
import UserMeditationSessionCard from "./UserMeditationSessionCard";

function UserMeditationsList(){
    const {userMeditations} = useOutletContext();

    console.log(`user mediations: ${userMeditations}`)
    


    return (
        <section>
            {userMeditations ? (
                userMeditations.map((meditation) => (
                    <div key={meditation.id}>
                        <h2>
                            <Link to={`/meditations/${meditation.id}`}>{meditation.title}</Link>
                        </h2>
                    </div>))
            ) : (
                <p>You have no meditations</p>
            )
        }

        </section>
    )
}

export default UserMeditationsList