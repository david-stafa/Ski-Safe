import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./navigation.scss";
import UserContext from "../../../context/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Navigation() {
    const { user, setUser } = useContext(UserContext);

    const navigate = useNavigate();

    const handleLogout = async (ev) => {
        ev.preventDefault();

        try {
            const response = await axios.post("/logout");
            const response_data = response.data;

            setUser(null);
            navigate("/");
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

    // profile pic below
    const [profilePicUrl, setProfilePicUrl] = useState(
        "/images/ProfilePic/Default.png"
    );
    useEffect(() => {
        if (user) {
            axios
                .get(`/api/uploads/user`)
                .then((response) => {
                    const profileUpload = response.data.uploads.find(
                        (upload) => upload.is_profile_picture === 1
                    );
                    if (profileUpload) {
                        setProfilePicUrl(`/storage/${profileUpload.image}`);
                    }
                })
                .catch((error) => {
                    console.error("Error fetching uploads:", error);
                });
        }
    }, [user]);
    // profile pic above

    return (
        <>
            <div className="left-panel-container">
                <Link to={"/"}>
                    <img
                        className="logo"
                        src="/images/Logo/logo.jpeg"
                        alt="logo ski safe"
                    />
                </Link>
                <div className="nav">
                    <div className="nav-links">
                        <Link to={"/"}>Home</Link>
                        <Link to={"/about-us"}>About</Link>
                        <Link to={"/contact-us"}>Contact</Link>
                        {user && <Link to={"/profile"}>Profile</Link>}
                        {user && user.role === "admin" && (
                            <Link to={"/admin"}>Admin</Link>
                        )}
                    </div>
                    <div className="nav-actions">
                        {!user ? (
                            <div>
                                <Link to={"/register"}>Register</Link>
                                <Link to={"/log-in"}>Log in</Link>
                            </div>
                        ) : (
                            <div className="login">
                                <span className="login-welcome">
                                    Hello
                                    <span className="login-welcome-name">
                                        {user.name}!
                                    </span>
                                </span>
                                <Link to={"/profile"} id="anchor">
                                    {" "}
                                    <img
                                        src={profilePicUrl}
                                        alt="Profile"
                                        id="unique-profile-picture"
                                        className="profile-picture"
                                    />
                                </Link>

                                <button onClick={handleLogout}>Log out</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
