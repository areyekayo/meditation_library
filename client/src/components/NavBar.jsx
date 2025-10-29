import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";

function NavBar() {
    const navigate = useNavigate()
    const {user, onLogout} = useContext(UserContext)

    const handleLogOut = () => {
        fetch('/logout', 
            {method: "DELETE"})
            .then((r) => {
                if (r.ok) {
                    onLogout();
                    navigate('/login')
                };
            });
        };

    return (
        <nav>
            <NavLink className="nav-link" to="/meditate">Home</NavLink>
            <NavLink className="nav-link" to="/meditations">Library</NavLink>
            {user ? (
                <button onClick={handleLogOut} className="nav-link">Logout</button>
            ) : (
                <NavLink className="nav-link"to="/login">Login</NavLink>
            )}
        </nav>
    )
}

export default NavBar