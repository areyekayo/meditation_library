import App from "./components/App";
import MeditationCollection from "./components/MeditationCollection";
import LoginForm from "./components/LoginForm";


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
                element: <LoginForm />
            }
        ]
    }
]

export default routes