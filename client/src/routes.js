import App from "./components/App";
import MeditationCollection from "./components/MeditationCollection";
import Login from "./pages/Login";


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