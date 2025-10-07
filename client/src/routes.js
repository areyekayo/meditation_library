import App from "./components/App";
import MeditationCollection from "./components/MeditationCollection";
import Login from "./pages/Login";
import Meditate from "./pages/Meditate";
import UserMeditationSessionCard from "./components/UserMeditationSessionCard";
import MeditationCard from "./components/MeditationCard";


const routes = [
    {
        path:"/",
        element: <App />,
        children: [
            {
                path: "/meditations",
                element: <MeditationCollection />,
                children: [
                    {
                        path: "/meditations/:id",
                        element: <MeditationCard />
                    }
                ]
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