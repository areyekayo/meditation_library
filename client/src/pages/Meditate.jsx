import MeditationSessionForm from "../components/MeditationSessionForm";
import UserMeditationsList from "../components/UserMeditationsList";

function Meditate(){

    return (
        <>
            <div>
                <UserMeditationsList />
            </div>
            <div>
                <MeditationSessionForm />
            </div>
        </>

    )
}
export default Meditate;