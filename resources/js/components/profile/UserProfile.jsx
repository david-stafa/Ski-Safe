import React, { useState, useEffect, useContext } from "react";
import UserContext from "../../context/UserContext";
import axios from "axios";
<<<<<<< HEAD
import "./userProfile.scss";
=======
import Uploading from "../Uploading/Uploading";
import EditUpload from "../Uploading/EditUpload";

import "./UserProfile.scss";
import UserPictures from "../Uploading/UserPictures";
>>>>>>> main

export default function UserProfile() {
    // We access user context to get user information and setUser function
    const { user, setUser } = useContext(UserContext);

    // State to manage the edit mode of the user profile
    const [isEditMode, setIsEditMode] = useState(false);

    // State to store user data for editing
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        image: "", // Added 'image' to the state
    });

    // We populate the userData state when the user context changes
    useEffect(() => {
        if (user) {
            setUserData({
                name: user.name,
                email: user.email,
                image: user.image || "", // Initialize with the user's image URL if available
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
            // We exit edit mode and update the user context with the new data
            setIsEditMode(false);
            setUser({ ...user, ...userData });
        } catch (error) {
            console.error("Error updating user data:", error);
        }
    };

    //pictures below
    const [userUpload, setUserUpload] = useState(null);
    useEffect(() => {
        const loadUserUploads = async () => {
            try {
                const response = await axios.get("/api/uploads/user");
                if (response.data.uploads && response.data.uploads.length > 0) {
                    setUserUpload(response.data.uploads);
                }
            } catch (error) {
                console.error("Error fetching user upload data:", error);
            }
        };

        if (user) {
            loadUserUploads();
        }
    }, [user]);

    //pictures above

    return (
        <div className="user-profile">
<<<<<<< HEAD
            <h1>User Profile</h1>
            {user ? (
                isEditMode ? (
                    <div className="edit-mode">
                        <label>
                            <p> Name:</p>
=======
            <h1 className="profile-header">USER PROFILE</h1>
            {user ? (
                isEditMode ? (
                    <div className="edit-form">
                        <div className="form-group">
                            <label htmlFor="name">Name:</label>
>>>>>>> main
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={userData.name}
                                onChange={handleInputChange}
                                className="form-input"
                            />
<<<<<<< HEAD
                        </label>
                        <label>
                            <p> Email:</p>
=======
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
>>>>>>> main
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={userData.email}
                                onChange={handleInputChange}
                                className="form-input"
                            />
<<<<<<< HEAD
                        </label>
                        <label>
                            <p> Image:</p>
                            <input
                                type="text"
                                name="image_url"
                                value={userData.image}
                                onChange={handleInputChange}
                            />
                        </label>
                        <button onClick={saveChanges}>Save Changes</button>
                    </div>
                ) : (
                    <div className="non-edit-mode">
                        <img src={userData.image} alt="User Image" />
=======
                        </div>
                        <button onClick={saveChanges} className="save-button">
                            Save Changes
                        </button>
                    </div>
                ) : (
                    <div className="user-details">
>>>>>>> main
                        <p>Name: {userData.name}</p>
                        <p>Email: {userData.email}</p>
                        <button
                            onClick={() => setIsEditMode(true)}
                            className="edit-button"
                        >
                            Edit Details
                        </button>
<<<<<<< HEAD
=======

                        <div>
                            {userUpload ? (
                                <UserPictures userUpload={userUpload} />
                            ) : (
                                <Uploading />
                            )}
                        </div>
>>>>>>> main
                    </div>
                )
            ) : (
                <p>Loading user data...</p>
            )}
        </div>
    );
}
