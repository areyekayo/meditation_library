import { useEffect, useState } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import NavBar from './NavBar'

function App() {
    const [meditations, setMeditations] = useState([]);
    const [user, setUser] = useState(null);
    const [meditationSessions, setMeditationSessions] = useState([]);
    const [userMeditations, setUserMeditations] = useState([]);

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

    const userMeditationList = meditationSessions.reduce((acc, session) => {
      if (!acc.find(med => med.id === session.meditation.id)) {
        acc.push(session.meditation);
      }
      return acc
    }, [])

    useEffect(() => {
      if (user) {
        fetch("/meditation_sessions")
        .then((res) => {
          if (res.ok){
            res.json().then((sessions) => {
              setMeditationSessions(sessions);
              setUserMeditations(userMeditationList);
              console.log(userMeditationList)
          }
        )
          }
        })
      }
    }, [user])


    const onMeditation = (newMeditationSession) => {
      setMeditationSessions(prevSessions => [...prevSessions, newMeditationSession]);
    }

    const location = useLocation();

    if (!user && location.pathname !== "/login") return <Navigate to='/login' />
    if (user && (location.pathname === "/login" || location.pathname === "/")) return <Navigate to='/meditate' />


    return (
        <div>
          <header>
          <h1>Meditation Library</h1>
          <NavBar />
          </header>
          <Outlet context={{meditations, onLogin: setUser, user, onMeditation, meditationSessions, userMeditations}} />
        </div>
    )
}

export default App;
