import App from "./components/App";
import MeditationCollection from "./components/MeditationCollection";
import SignupForm from "./components/SignupForm";

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
                path: "/signup",
                element: <SignupForm />
            }
        ]
    }
]

export default routes