import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

function UserMeditationsList(){
    const {userMeditations} = useContext(UserContext); 

    return (
        <section className="list">
            <h3>Your Meditations</h3>
            {userMeditations.length > 0 ? (
                userMeditations.map((meditation) => (
                    <h4 key={meditation.id}>
                        <Link to={`/meditations/${meditation.id}`}>{meditation.title}</Link>
                    </h4>))
            ) : (
                <p>You have no meditations with logged sessions yet. Add one below!</p>
            )
        }

        </section>
    )
}

export default UserMeditationsList