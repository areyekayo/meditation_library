import { useEffect, useState } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import NavBar from './NavBar'

function App() {
    const [meditations, setMeditations] = useState([]);
    const [user, setUser] = useState(null);
    const [meditationSessions, setMeditationSessions] = useState([]);

    useEffect(() => {
        fetch("/meditations")
        .then((r) => r.json())
        .then(setMeditations);
    }, []);

    useEffect(() => {
      fetch("/check_session").then((r) => {
        if (r.ok){
          r.json().then((user) => setUser(user))
        }
      });
    }, [])

    useEffect(() => {
      if (user) {
        fetch("/meditation_sessions")
        .then((res) => {
          if (res.ok){
            res.json().then((sessions) => setMeditationSessions(sessions))
          }
        })
      }
    }, [user])


    const onMeditation = (newMeditationSession) => {
      setMeditationSessions(prevSessions => [...prevSessions, newMeditationSession]);
    }

    const location = useLocation();

    if (!user && location.pathname !== "/login") return <Navigate to='/login' />
    if (user && (location.pathname === "/login" || location.pathname === "/")) return <Navigate to='/meditation_sessions' />


    return (
        <div>
          <header>
          <h1>Meditation Library</h1>
          <NavBar />
          </header>
          <Outlet context={{meditations, onLogin: setUser, user, onMeditation, meditationSessions}} />
        </div>
    )
}

export default App;
