import App from "./components/App";
import MeditationCollection from "./components/MeditationCollection";

const routes = [
    {
        path:"/",
        element: <App />,
        children: [
            {
                path: "/meditations",
                element: <MeditationCollection />
            }
        ]
    }
]

export default routes