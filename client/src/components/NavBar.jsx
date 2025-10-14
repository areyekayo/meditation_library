import { NavLink, useNavigate } from "react-router-dom";

function NavBar({user, setUser}) {
    const navigate = useNavigate()

    const handleLogOut = () => {
        fetch('/logout', 
            {method: "DELETE"})
            .then((r) => {
                if (r.ok) {
                    setUser(null);
                    navigate('/login')
                };
            });
        };

    return (
        <nav>
            <NavLink className="nav-link" to="/">Home</NavLink>
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