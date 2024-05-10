import React from "react"
import {createRoot} from "react-dom/client"
import {Provider} from "react-redux"
import App from "./App"
import {store} from "./store/store"
import {NextUIProvider} from "@nextui-org/react";
import "./index.css"

const container = document.getElementById("root")

if (container) {
    const root = createRoot(container)

    root.render(
        <React.StrictMode>
            <Provider store={store}>
                <NextUIProvider>
                    <App/>
                </NextUIProvider>
            </Provider>
        </React.StrictMode>,
    )
} else {
    throw new Error(
        "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
    )
}