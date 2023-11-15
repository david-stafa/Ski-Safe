import React, { useState, useEffect, useContext } from "react";
import UserContext from "../../../context/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./login.scss";
import SideNavigation from "../navigation-side/SideNavigation";

export default function Login(props) {
    const [values, setValues] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({});

    const { user, setUser } = useContext(UserContext);

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post("/login", values);
            console.log(response);

            setUser(null);
            if (response.status === 200) {
                const paragraph = document.querySelector(".success-login");
                paragraph.style.display = "block";
                navigate("/");
            }
        } catch (error) {
            if (error.response && error.response.status === 422) {
                console.log("VALIDATION FAILED:", error.response.data.errors);
                setErrors(error.response.data.errors);
            } else {
                console.log("ERROR", error);
                setErrors({ general: ["An unexpected error occurred."] });
            }
        }
    };

    const handleChange = (event) => {
        setValues((previous_values) => {
            return {
                ...previous_values,
                [event.target.name]: event.target.value,
            };
        });
    };

    return (
        <div className="register-container">
            <div className="register-header">
                <h1>LET'S LOGIN</h1>
            </div>
            <form
                action="/login"
                method="post"
                onSubmit={handleSubmit}
                className="register-form"
            >
                <div className="input-group">
                    <label htmlFor="email">Email:</label>
                    <br />
                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        className="input-field"
                    />
                    <br />
                    {errors.email ? (
                        <div className="errors">
                            {errors.email.map((error, i) => (
                                <div key={i} className="error">
                                    {error}
                                </div>
                            ))}
                        </div>
                    ) : (
                        ""
                    )}
                </div>

                <div className="input-group">
                    <label htmlFor="password">Password:</label>
                    <br />
                    <input
                        id="password"
                        type="password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        className="input-field"
                    />
                    <br />
                    {errors.password ? (
                        <div className="errors">
                            {errors.password.map((error, i) => (
                                <div key={i} className="error">
                                    {error}
                                </div>
                            ))}
                        </div>
                    ) : (
                        ""
                    )}
                </div>

                <button className="submit-button">Login</button>
                <p className="success-message">
                    {user
                        ? `Hello ${user.name}, you have successfully logged in.`
                        : ""}
                </p>
            </form>

            <SideNavigation />
        </div>
    );
}
