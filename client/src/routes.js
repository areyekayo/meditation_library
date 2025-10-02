import App from "./components/App";
import MeditationCollection from "./components/MeditationCollection";
import Login from "./pages/Login";
import Meditate from "./pages/Meditate";


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
            },
            {
                path: "/meditation_sessions",
                element: <Meditate />
            }
        ]
    }
]

export default routes