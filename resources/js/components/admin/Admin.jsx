import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import UserContext from "../../context/UserContext";
import "./admin.scss";
import ProfilePictures from "./ProfilePictures";
import { Link } from "react-router-dom";

export default function Admin() {
    // State to store user data
    const [users, setUsers] = useState([]);
    // Access user context to get user information and setUser function
    const { user, setUser } = useContext(UserContext);
    // State to store user roles
    const [userRoles, setUserRoles] = useState([]);

    const [userPins, setUserPins] = useState([]);

    // We fetch the user data
    const fetchUserData = async () => {
        try {
            const response = await axios.get("/api/admin");
            const data = response.data;

            const userData = data.map((user) => ({
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            }));
            // Update the users state with the fetched data
            setUsers(userData);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };
    const fetchPinsData = async () => {
        try {
            const response = await axios.get("/api/pins");
            const data = response.data;

            const pinsData = data.map((userPins) => ({
                id: userPins.id,
                longitude: userPins.longitude,
                latitude: userPins.latitude,
                title: userPins.title,
                severity_id: userPins.severity_id,
                slug: userPins.slug,
                description: userPins.description,
                active: userPins.active,
                created_at: userPins.created_at,
                updated_at: userPins.updated_at,
            }));
            // Update the users state with the fetched data
            setUserPins(pinsData);
        } catch (error) {
            console.error("Error fetching pins data:", error);
        }
    };

    // We fetch the user role
    const fetchRoles = async () => {
        try {
            const response = await axios.get("api/user-roles");
            console.log(response);
            setUserRoles(response.data);
        } catch {}
    };

    const saveNewUserRole = async (e, user) => {
        const data = {
            user_id: user.id,
            role: e.target.value,
        };
        // console.log(data);
        try {
            const response = await axios.post("/api/user-roles/update", data);
            console.log(response.data);
        } catch {}
    };

    // Use useEffect to fetch user data and roles when the component mounts
    useEffect(() => {
        fetchUserData();
        fetchRoles();
        setUserPins();
    }, []);

    return (
        <>
            {user?.role === "admin" ? (
                <div className="admin-container">
                    <h1 className="admin-title">
                        Hello Admin, the user can't see this page
                    </h1>
                    <h2>User Data:</h2>
                    <ul className="admin-list">
                        {users.map((user, index) => (
                            <li key={index} className="admin-list-item">
                                Name: {user.name}
                                <br /> Email: {user.email}{" "}
                                <select
                                    defaultValue={user.role}
                                    onChange={(e) => {
                                        saveNewUserRole(e, user);
                                    }}
                                    className="admin-select"
                                >
                                    {userRoles.map((role, index) => (
                                        <option key={index} value={role}>
                                            {role}
                                        </option>
                                    ))}
                                </select>
                            </li>
                        ))}
                    </ul>

                    <Link to={"/profilepictures"} className="admin-button">
                        Check Pictures
                    </Link>
                    <Link to={"/contactusmessages"} className="admin-button">
                        Check Messages
                    </Link>
                </div>
            ) : (
                <h1>Access denied</h1>
            )}
        </>
    );
}
