import {useState} from "react";
import { useOutletContext, Link } from "react-router-dom";
import MeditationCard from "./MeditationCard";

function MeditationCollection() {
    const {meditations} = useOutletContext();

    return(
        <div>
            {meditations.map(meditation => (
                <>
                    <br />
                        <Link to={`/meditations/${meditation.id}`} key={meditation.id}>{meditation.title}</Link>
                    <br />
                </>
            ))}
        </div>
    )
}
export default MeditationCollection