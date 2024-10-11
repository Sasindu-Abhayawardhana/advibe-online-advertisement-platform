import React from "react";
import './App.css';
import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements
} from 'react-router-dom';
import Home from "./component/Home";
import RootLayout from "./layouts/RootLayout";
import UserHandler from "./component/user-component/UserHandler";
import { UserProvider } from "./context/UserProvider";

/*
* Main Root Layout define
* */
const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path="user" element={<UserHandler />} />
            <Route path="*" />
        </Route>
    )
);

function App() {
    return (
        <UserProvider>
            <RouterProvider router={router} />
        </UserProvider>
    );
}

export default App;