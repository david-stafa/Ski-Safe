import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./navigation.scss";
import UserContext from "../../../context/UserContext";
import axios from "axios";
import TestModal from "../../Modal/TestModal";

export default function Navigation() {
    const { user, setUser } = useContext(UserContext);

    const handleLogout = async (ev) => {
        ev.preventDefault();

        try {
            const response = await axios.post("/logout");
            const response_data = response.data;

            setUser(null);
        } catch (error) {
            switch (error.response.status) {
                case 422:
                    console.log(
                        "VALIDATION FAILED:",
                        error.response.data.errors
                    );
                    break;
                case 500:
                    console.log("UNKNOWN ERROR", error.response.data);
                    break;
            }
        }
    };

    return (
        <>
            <div className="left-panel-container">
                <Link to={"/"}>
                    <img
                        className="logo"
                        src="/images/Logo/logo.png"
                        alt="logo ski safe"
                    />
                </Link>
                <div className="nav">
                    <div className="nav-links">
                        <Link to={"/"}>Home</Link>
                        <Link to={"/about-us"}>About us</Link>
                        <Link to={"/contact-us"}>Contact us</Link>
                    </div>
                    <div className="nav-actions">
                        <Link to={"/register"}>Register</Link>
                        <Link to={"/log-in"}>Log in</Link>
                        <button onClick={handleLogout}>Log out</button>
                    </div>
                </div>
                <span className="sidenav__arrow"></span>
            </div>
        </>
    );
}
