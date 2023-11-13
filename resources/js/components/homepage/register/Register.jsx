import React, { useState, useEffect, useContext } from "react";
import UserContext from "../../../context/UserContext";
import axios from "axios";

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

    const handleSubmit = async (event) => {
        event.preventDefault();

        // clear the errors
        setErrors({});

        try {
            const response = await axios.post("/register", values);
            
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
    const handleChange = (event) => {
        setValues((previous_values) => {
            return {
                ...previous_values,
                [event.target.name]: event.target.value,
            };
        });
    };

    return (
        <form action="/register" method="post" onSubmit={handleSubmit}>
            Name:
            <br />
            <input
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
            />
            <br />
            Surname:
            <br />
            <input
                type="text"
                name="surname"
                value={values.surname}
                onChange={handleChange}
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
            Email:
            <br />
            <input
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
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
            Password:
            <br />
            <input
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
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
            Confirm pasword:
            <br />
            <input
                type="password"
                name="password_confirmation"
                value={values.password_confirmation}
                onChange={handleChange}
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
            <button>Register</button>
        </form>
    );
}
