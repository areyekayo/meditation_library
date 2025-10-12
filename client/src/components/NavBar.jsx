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
            <NavLink to="/">Home</NavLink>
            <NavLink to="/meditations">Library</NavLink>
            {user ? (
                <button onClick={handleLogOut} style={{cursor: 'pointer', background: 'none', border: 'none', padding: 0, font: 'inherit', color: 'blue', textDecoration: 'underline'}}>Logout</button>
            ) : (
                <NavLink to="/login">Login</NavLink>
            )}
        </nav>
    )
}

export default NavBar