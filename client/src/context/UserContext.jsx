import React, {useState, useEffect, useContext} from "react";
import { MeditationContext } from "./MeditationContext";

const UserContext = React.createContext();

function UserProvider({children}) {
    const [user, setUser] = useState(null);
    const [userMeditations, setUserMeditations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const {meditations} = useContext(MeditationContext);

    const checkSession = () => {
        fetch("/check_session").then((r) => {
            if (r.ok){
                r.json().then((user) => {
                    setUser({id: user.id, username: user.username});
                    setUserMeditations(user.meditations);
                    setIsLoading(false);
                })
            } else {
                setUser(null);
                setUserMeditations([]);
                setIsLoading(false);
            }
        })
    };

    // initial check session to load user and their meditations
    useEffect(() => {
        checkSession();
    }, []);

    const onSessionRefresh = () => {
        checkSession(); // 
    }

    const onAddMeditationSession = (session) => {
        // get the session's meditation
        setUserMeditations((prevMeditations) => {
            const medIndex = prevMeditations.findIndex(m => m.id === session.meditation_id);

            if (medIndex >= 0) {
            const updatedMeditations = [...prevMeditations];

            updatedMeditations[medIndex] = {
                ...updatedMeditations[medIndex],
                meditation_sessions: [...updatedMeditations[medIndex].meditation_sessions, session]
            }
            return updatedMeditations;
        } else {
            const meditation = meditations.find((m) => m.id === session.meditation_id);
            if (meditation) {
                const newMeditation = {
                    ...meditation, meditation_sessions: [session]
                };
                return [...prevMeditations, newMeditation]
            }
            else {
            return prevMeditations;
            }
        }
        })
        
    }

    return <UserContext.Provider value={{user, onLogin: setUser, userMeditations, onSessionRefresh, onAddMeditationSession, isLoading }}>{children}</UserContext.Provider>
}

export {UserContext, UserProvider};