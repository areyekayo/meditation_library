import React, {useState, useEffect} from "react";

const UserContext = React.createContext();

function UserProvider({children}) {
    const [user, setUser] = useState(null);
    const [userMeditations, setUserMeditations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

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

    useEffect(() => {
        checkSession();
    }, []);

    const onSessionRefresh = () => {
        checkSession();
    }

    return <UserContext.Provider value={{user, onLogin: setUser, userMeditations, onSessionRefresh, isLoading }}>{children}</UserContext.Provider>
}

export {UserContext, UserProvider};