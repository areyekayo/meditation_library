import { useContext } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import NavBar from './NavBar'
import { UserContext } from "../context/UserContext";

function App() {

    const {user} = useContext(UserContext)
    
    const location = useLocation();

    if (!user && location.pathname !== "/login") return <Navigate to='/login' />
    if (user && (location.pathname === "/login" || location.pathname === "/")) return <Navigate to='/meditate' />

    return (
        <div className="App">

          <header className="App-header">
            <h1>Meditation Library</h1>
            <NavBar />
          </header>
          <Outlet />
        </div>
    )
}

export default App;
