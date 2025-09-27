import {useState} from "react";
import { useOutletContext } from "react-router-dom";
import MeditationCard from "./MeditationCard";

function MeditationCollection() {
    const {meditations} = useOutletContext();

    return(
        <div>
            {meditations.map(meditation => (
                <MeditationCard
                    key={meditation.id}
                    title={meditation.title}
                    type={meditation.type}
                    duration={meditation.duration}
                    instructions={meditation.instructions}
                />
            ))}
        </div>
    )
}
export default MeditationCollection