import React, { useState, useEffect, useContext } from "react";
import UserContext from "../../../context/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Register.scss";

export default function Register(props) {
    const [values, setValues] = useState({
        email: "",
        name: "",
        surname: "",
        password: "",
        password_confirmation: "",
    });

    const [errors, setErrors] = useState({});

    const { setUser } = useContext(UserContext);

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        // clear the errors
        setErrors({});

        try {
            const response = await axios.post("/register", values);
            navigate("/");
            setUser(response.data.user);
        } catch (error) {
            if (error.response && error.response.status === 422) {
                console.log(
                    "VALIDATION FAILED:",
                    error.response.data.errors,
                    setErrors(error.response.data.errors)
                );
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
                <h1>REGISTER TO OUR SITE</h1>
            </div>

            <form
                action="/register"
                method="post"
                onSubmit={handleSubmit}
                className="register-form"
            >
                <div className="input-group">
                    <label htmlFor="name">Name:</label>
                    <br />
                    <input
                        id="name"
                        type="text"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        className="input-field"
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="surname">Surname:</label>
                    <br />
                    <input
                        id="surname"
                        type="text"
                        name="surname"
                        value={values.surname}
                        onChange={handleChange}
                        className="input-field"
                    />
                    <br />
                    {errors.name ? (
                        <div className="errors">
                            {errors.name.map((error, i) => (
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

                <div className="input-group">
                    <label htmlFor="confirmpassword">Confirm Password:</label>
                    <br />
                    <input
                        id="confirmpassword"
                        type="password"
                        name="password_confirmation"
                        value={values.password_confirmation}
                        onChange={handleChange}
                        className="input-field"
                    />

                    <br />
                    {errors.password_confirmation ? (
                        <div className="errors">
                            {errors.password_confirmation.map((error, i) => (
                                <div key={i} className="error">
                                    {error}
                                </div>
                            ))}
                        </div>
                    ) : (
                        ""
                    )}
                </div>
                <button className="submit-button">Register</button>
            </form>
        </div>
    );
}
