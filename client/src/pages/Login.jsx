import { useState } from "react";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";

function Login(){
    const [showLogin, setShowLogin] = useState(true);

    return (
        <div>
            {showLogin ? (
                <>
                    <LoginForm />
                    <p>
                        Don't have an account?
                        <button onClick={() => setShowLogin(false)}>
                            Sign Up
                        </button>
                    </p>
                </>
            ) : (
                <>
                <SignupForm />
                <p>Already have an account?</p>
                <button onClick={() => setShowLogin(true)}>
                    Log In
                </button>
                </>
            )}
        </div>
    )
}

export default Login;