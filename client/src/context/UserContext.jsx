import React, {useState, useEffect} from "react";

const UserContext = React.createContext();

function UserProvider({children}) {
    const [user, setUser] = useState(null);
    const [userMeditations, setUserMeditations] = useState([]);

    const checkSession = () => {
        fetch("/check_session").then((r) => {
            if (r.ok){
                r.json().then((user) => {
                    setUser({id: user.id, username: user.username});
                    setUserMeditations(user.meditations);
                })
            } else {
                setUser(null);
                setUserMeditations([]);
            }
        })
    };

    useEffect(() => {
        checkSession();
    }, []);

    const onSessionRefresh = () => {
        checkSession();
    }

    return <UserContext.Provider value={{user, onLogin: setUser, userMeditations, onSessionRefresh }}>{children}</UserContext.Provider>
}

export {UserContext, UserProvider};