import React, { useState, useEffect, useContext } from "react";
import UserContext from "../../context/UserContext";
import axios from "axios";
import Uploading from "../Uploading/Uploading";

import "./UserProfile.scss";

export default function UserProfile() {
    // We access user context to get user information and setUser function
    const { user, setUser } = useContext(UserContext);

    // State to manage the edit mode of the user profile
    const [isEditMode, setIsEditMode] = useState(false);

    // State to store user data for editing
    const [userData, setUserData] = useState({
        name: "",
        email: "",
    });

    // We populate the userData state when the user context changes
    useEffect(() => {
        if (user) {
            setUserData({
                name: user.name,
                email: user.email,
            });
        }
    }, [user]);

    // We handle input changes in the form
    const handleInputChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    // We save changes to user profile data
    const saveChanges = async () => {
        try {
            // We send a POST request to update user profile data
            await axios.post("/api/profile", userData);
            // We  exit edit mode and update the user context with the new data
            setIsEditMode(false);
            setUser({ ...user, ...userData });
        } catch (error) {
            console.error("Error updating user data:", error);
        }
    };

    return (
        <div className="user-profile">
            <h1 className="profile-header">User Profile</h1>
            {user ? (
                isEditMode ? (
                    <div className="edit-form">
                        <div className="form-group">
                            <label htmlFor="name">Name:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={userData.name}
                                onChange={handleInputChange}
                                className="form-input"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={userData.email}
                                onChange={handleInputChange}
                                className="form-input"
                            />
                        </div>
                        <button onClick={saveChanges} className="save-button">
                            Save Changes
                        </button>
                    </div>
                ) : (
                    <div className="user-details">
                        <p>Name: {userData.name}</p>
                        <p>Email: {userData.email}</p>
                        <button
                            onClick={() => setIsEditMode(true)}
                            className="edit-button"
                        >
                            Edit Details
                        </button>
                        <Uploading />
                    </div>
                )
            ) : (
                <p>Loading user data...</p>
            )}
        </div>
    );
}
