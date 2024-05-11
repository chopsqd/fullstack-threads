import React from "react"
import {createRoot} from "react-dom/client"
import {Provider} from "react-redux"
import {store} from "./store/store"
import {NextUIProvider} from "@nextui-org/react";
import "./index.css"
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import ThemeProvider from "./providers/ThemeProvider";
import Layout from "./components/Layout";
import {Auth, CurrentPost, Followers, Following, Posts, Profile} from "./pages";
import AuthGuard from "./providers/AuthGuard";

const container = document.getElementById("root")

const router = createBrowserRouter([
    {
        path: '/auth',
        element: <Auth/>
    },
    {
        path: '/',
        element: <Layout/>,
        children: [
            {
                path: '',
                element: <Posts/>
            },
            {
                path: 'posts/:id',
                element: <CurrentPost/>
            },
            {
                path: 'users/:id',
                element: <Profile/>
            },
            {
                path: 'followers',
                element: <Followers/>
            },
            {
                path: 'following',
                element: <Following/>
            }
        ]
    }
])

if (container) {
    const root = createRoot(container)

    root.render(
        <React.StrictMode>
            <Provider store={store}>
                <NextUIProvider>
                    <ThemeProvider>
                        <AuthGuard>
                            <RouterProvider router={router}/>
                        </AuthGuard>
                    </ThemeProvider>
                </NextUIProvider>
            </Provider>
        </React.StrictMode>,
    )
} else {
    throw new Error(
        "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
    )
}
