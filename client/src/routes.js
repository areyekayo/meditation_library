import App from "./components/App";
import MeditationCollection from "./components/MeditationCollection";
import Login from "./pages/Login";
import Meditate from "./pages/Meditate";
import MeditationCard from "./components/MeditationCard";
import UserMeditationSessionCard from "./components/UserMeditationSessionCard";


const routes = [
    {
        path:"/",
        element: <App />,
        children: [
            {
                path: "/meditations",
                element: <MeditationCollection />,
            },
            {
                path: "/meditations/:id",
                element: <MeditationCard />,
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/meditate",
                element: <Meditate />
            },
            {
                path: "/meditation_sessions/:id",
                element: <UserMeditationSessionCard />
            }
        ]
    }
]

export default routes