import {useState} from "react";
import { useOutletContext, Link } from "react-router-dom";
import MeditationCard from "./MeditationCard";

function MeditationCollection() {
    const {meditations} = useOutletContext();

    return(
        <div>
            {meditations.map(meditation => (
                <Link to={`/meditations/${meditation.id}`}>{meditation.title}</Link>
            ))}
        </div>
    )
}
export default MeditationCollection