import React, {useState, useEffect} from "react";

const MeditationContext = React.createContext()

function MeditationProvider({children}) {
    const [meditations, setMeditations] = useState([]);

    useEffect(() => {
        fetch("/meditations")
        .then((r) => r.json())
        .then(setMeditations)
    }, []);

    const onAddMeditation = (newMeditation) => {
        setMeditations([...meditations, newMeditation])
    };

    return (
        <MeditationContext.Provider value={{meditations, onAddMeditation}}>
            {children}
        </MeditationContext.Provider>
    )
}

export {MeditationContext, MeditationProvider};