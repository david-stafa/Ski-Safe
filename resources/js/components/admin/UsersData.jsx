import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import UserContext from "../../context/UserContext";
import "./admin.scss";

export default function UsersData({ userRoles }) {
    const [users, setUsers] = useState([]);
    const { user, setUser } = useContext(UserContext);

    const fetchUserData = async () => {
        try {
            const response = await axios.get("/api/admin");
            const data = response.data;
            console.log(response);

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
    const saveNewUserRole = async (e, user) => {
        const data = {
            user_id: user.id,
            role: e.target.value,
        };

        try {
            const response = await axios.post("/api/user-roles/update", data);
            console.log(response.data);
        } catch {}
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    return (
        <>
            <h2>User Data</h2>
            {console.log(userRoles)}
            <ul className="admin-list">
                {users.map((user, index) => (
                    <li key={index} className="admin-list-item">
                        Name: {user.name}
                        <br /> Email: {user.email}
                        <select
                            defaultValue={user.role}
                            onChange={(e) => saveNewUserRole(e, user)}
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
        </>
    );
}
