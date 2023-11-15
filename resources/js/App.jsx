import React from "react";
import { useState, useEffect } from "react";
import TestModal from "./components/Modal/TestModal";
import Homepage from "./components/homepage/homepage";
import UserContext from "./context/UserContext";
import { BrowserRouter } from "react-router-dom";
import "../css/app.css";

export default function App() {
    const [content, setContent] = useState("");

    const [user, setUser] = useState(null); // null - user status unknown
    // false - user not logged in (but we know that)

    const loadUserStatus = async () => {
        const response = await fetch("/api/user", {
            headers: {
                Accept: "application/json",
            },
        });

        const data = await response.json();

        if (!(data.unauthorized || false)) {
            setUser(data);
        } else {
            setUser(false); // false - user not logged in
        }
    };

    useEffect(() => {
        if (user === null) {
            // load user status anytime user is null, i.e. we don't know his status
            loadUserStatus();
        }
    }, [user]);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            <BrowserRouter>
                <Homepage />
                <TestModal />
            </BrowserRouter>
        </UserContext.Provider>
    );
}
