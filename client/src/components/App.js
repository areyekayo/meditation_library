import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import NavBar from './NavBar'

function App() {
    const [meditations, setMeditations] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch("/meditations")
        .then((r) => r.json())
        .then(setMeditations);
    }, []);

    useEffect(() => {
      fetch("/users")
      .then((r) => r.json())
      .then(setUsers);
    }, []);

    return (
        <div>
          <header>
          <h1>Meditation Library</h1>
          <NavBar />
          </header>
          <Outlet context={{meditations: meditations, users: users, onSignup: setUsers}} />
        </div>
    )
}

export default App;
