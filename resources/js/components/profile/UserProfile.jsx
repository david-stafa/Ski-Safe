import React, { useState, useEffect, useContext } from "react";
import UserContext from "../../context/UserContext";
import axios from "axios";

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
        <div>
            <h1>User Profile</h1>
            {user ? (
                isEditMode ? (
                    <>
                        <label>
                            Name:
                            <input
                                type="text"
                                name="name"
                                value={userData.name}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label>
                            Email:
                            <input
                                type="email"
                                name="email"
                                value={userData.email}
                                onChange={handleInputChange}
                            />
                        </label>
                        <button onClick={saveChanges}>Save Changes</button>
                    </>
                ) : (
                    // We display user details in non-edit mode
                    <>
                        <p>Name: {userData.name}</p>
                        <p>Email: {userData.email}</p>
                        <button onClick={() => setIsEditMode(true)}>
                            Edit Details
                        </button>
                    </>
                )
            ) : (
                <p>Loading user data...</p>
            )}
        </div>
    );
}
