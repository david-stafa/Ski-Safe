import React, { useState, useEffect, useContext } from "react";
import UserContext from "../../../context/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Register.scss";
import SuccessModal from "./SuccessModal";
import Modal from "react-modal";

export default function Register(props) {
    const [values, setValues] = useState({
        email: "",
        name: "",
        password: "",
        password_confirmation: "",
    });
    useEffect(() => {
        Modal.setAppElement("#root"); // Set the app element when the component mounts
    }, []);

    const [errors, setErrors] = useState({});
    const [showModal, setShowModal] = useState(false);

    const { setUser } = useContext(UserContext);

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        // clear the errors
        setErrors({});

        try {
            const response = await axios.post("/register", values);
            setShowModal(true);
            // navigate("/");
            // setUser(null);
            setTimeout(() => {
                navigate("/");
                setUser(null);
            }, 3000);
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
                <div className="input-group-register">
                    <label htmlFor="name">Username:</label>
                    <br />
                    <input
                        id="name"
                        type="text"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        className="input-field-register"
                    />
                </div>

                <div className="input-group-register">
                    <label htmlFor="email">Email:</label>
                    <br />
                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        className="input-field-register"
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

                <div className="input-group-register">
                    <label htmlFor="password">Password:</label>
                    <br />
                    <input
                        id="password"
                        type="password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        className="input-field-register"
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

                <div className="input-group-register">
                    <label htmlFor="confirmpassword">Confirm Password:</label>
                    <br />
                    <input
                        id="confirmpassword"
                        type="password"
                        name="password_confirmation"
                        value={values.password_confirmation}
                        onChange={handleChange}
                        className="input-field-register"
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
                <SuccessModal
                    isOpen={showModal}
                    onRequestClose={() => setShowModal(false)}
                />
            </form>
        </div>
    );
}
