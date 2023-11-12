import React from "react";

import TestModal from "./components/Modal/TestModal";
import Homepage from "./components/homepage/homepage";
import { BrowserRouter } from "react-router-dom";
import "../css/app.css";

export default function App() {
    return (
        <BrowserRouter>
            <Homepage />
            <TestModal />
        </BrowserRouter>
    );
}
