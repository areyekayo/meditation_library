import { useState } from "react";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";

function Login(){
    const [showLogin, setShowLogin] = useState(true);

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