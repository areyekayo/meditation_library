import { useEffect, useState } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import NavBar from './NavBar'

function App() {
    const [meditations, setMeditations] = useState([]);
    const [user, setUser] = useState("");
    const [userMeditations, setUserMeditations] = useState([]);

    useEffect(() => {
        fetch("/meditations")
        .then((r) => r.json())
        .then(setMeditations);
    }, []);

    const checkSession = () => {
      fetch("/check_session").then((r) => {
        if (r.ok){
          r.json().then((user) => {
            setUser(user);
            setUserMeditations(user.meditations);
          })
        } else {
          setUser(null);
          setUserMeditations([]);
        }
      });
    }
    // initial check session
    useEffect(() => {
      checkSession();
    }, []);

    // when changes are made to a user's meditations and their sessions, call check session again to refresh userMeditations
    const onSessionRefresh = () => {
      checkSession()
    }

    const location = useLocation();

    if (!user && location.pathname !== "/login") return <Navigate to='/login' />
    if (user && (location.pathname === "/login" || location.pathname === "/")) return <Navigate to='/meditate' />

    return (
        <div>
          <header>
          <h1>Meditation Library</h1>
          <NavBar setUser={setUser} user={user} />
          </header>
          <Outlet context={{meditations, onLogin: setUser, user, onSessionRefresh, userMeditations}} />
        </div>
    )
}

export default App;
