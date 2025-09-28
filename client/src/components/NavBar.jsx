import { NavLink } from "react-router-dom";

function NavBar() {
    return (
        <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/meditations">Meditations</NavLink>
            <NavLink to="/login">Login</NavLink>
        </nav>
    )
}

export default NavBar