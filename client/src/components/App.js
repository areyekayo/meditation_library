import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import NavBar from './NavBar'


function App() {
    const [meditations, setMeditations] = useState([]);
    const [user, setUser] = useState(null);

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

    if (!user) return <Navigate to='/login' />

    return (
        <div>
          <header>
          <h1>Meditation Library</h1>
          <NavBar />
          </header>
          <Outlet context={{meditations: meditations, onLogin: setUser, user: user}} />
        </div>
    )
}

export default App;
