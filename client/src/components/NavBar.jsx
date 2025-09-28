import { NavLink } from "react-router-dom";

function NavBar() {
    return (
        <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/meditations">Meditations</NavLink>
            <NavLink to="/signup">Sign Up</NavLink>
        </nav>
    )
}

export default NavBar