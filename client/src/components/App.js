import { useEffect, useState } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import NavBar from './NavBar'

function App() {
    const [meditations, setMeditations] = useState([]);
    const [user, setUser] = useState({id: "", username: ""});
    const [userMeditations, setUserMeditations] = useState([]);

    useEffect(() => {
        fetch("/meditations")
        .then((r) => r.json())
        .then(setMeditations);
    }, []);

    // Function to enable auto-login and refresh user meditations state
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

    const onAddMeditation = (newMeditation) => {
      setMeditations([...meditations, newMeditation])
    }
    
    const location = useLocation();

    if (!user && location.pathname !== "/login") return <Navigate to='/login' />
    if (user && (location.pathname === "/login" || location.pathname === "/")) return <Navigate to='/meditate' />

    return (
        <div className="App">
          <header className="App-header">
          <h1>Meditation Library</h1>
          <NavBar setUser={setUser} user={user} />
          </header>
          <Outlet context={{meditations, onLogin: setUser, user, onSessionRefresh, userMeditations, onAddMeditation}} />
        </div>
    )
}

export default App;
