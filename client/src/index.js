import React from "react";
import ReactDOM from "react-dom/client";
import routes from "./routes";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import { MeditationProvider } from "./context/MeditationContext";

const router = createBrowserRouter(routes);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <MeditationProvider>
            <UserProvider>
                <RouterProvider router={router} />
            </UserProvider>
        </MeditationProvider>
    </React.StrictMode>
);
