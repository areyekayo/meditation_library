import App from "./components/App";
import MeditationCollection from "./components/MeditationCollection";
import SignupForm from "./components/SignupForm"; 
import Login from "./components/Login";


const routes = [
    {
        path:"/",
        element: <App />,
        children: [
            {
                path: "/meditations",
                element: <MeditationCollection />
            },
            {
                path: "/login",
                element: <Login />
            }
        ]
    }
]

export default routes