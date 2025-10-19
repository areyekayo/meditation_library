import { useState, useContext, useEffect } from "react";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";
import { useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function Login(){
    const [showLogin, setShowLogin] = useState(true);
    const {user} = useContext(UserContext);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // redirect to /meditate page once user logs in
        if (user && location.pathname === "/login") {
            navigate("/meditate", {replace: true});
        }
    }, [user, navigate, location.pathname]);

    return (
        <div>
            {showLogin ? (
                <div className="list">
                    <LoginForm />
                    <p>Don't have an account?</p>
                        <button onClick={() => setShowLogin(false)}>
                            Sign Up
                        </button>
                </div>
            ) : (
                <div className="list">
                <SignupForm />
                    <p>Already have an account?</p>
                    <button onClick={() => setShowLogin(true)}>
                        Log In
                    </button>
                </div>
            )}
        </div>
    )
}

export default Login;