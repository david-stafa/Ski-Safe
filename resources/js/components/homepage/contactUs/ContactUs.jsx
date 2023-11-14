import React, { useState } from "react";
import "./contactUs.scss";
import axios from "axios";

import { types } from "./types";
import FieldsetBox from "./FieldsetBox/FieldsetBox";
import Modal from "../../Modal/Modal";
import useToggle from "../../Modal/use-toggle";

const typeNames = Object.entries(types);

export default function ContactUs() {
    const [type, setType] = useState("");
    const [contactText, setContactText] = useState("");
    const [isModalOpen, toggleIsModalOpen] = useToggle(false);
    const maxLength = 291;

    const handleSubmit = async (event) => {
        event.preventDefault();

        const messageData = {
            category: type,
            message: contactText,
            // user_id: null -> when finished Auth
        };

        try {
            const response = await axios.post(
                "/api/messages/store",
                messageData
            );
            console.log(response.data);
            response.data ? toggleIsModalOpen(true) : "";
            setContactText("");
            setType("");
        } catch (error) {
            console.error(
                "Something is wrong, data from Contact Us is not send: ",
                error
            );
            alert("Failed to send your message. Please try again.");
        }
    };

    return (
        <div className="contact-container">
            <div className="contact-header">
                <h1>CONTACT US</h1>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
                <FieldsetBox
                    type={type}
                    setType={setType}
                    typeNames={typeNames}
                />
                <p className="type-display">Selected type: {types[type]}</p>

                <label htmlFor="message-field">
                    Please write your message:
                </label>
                <textarea
                    required
                    id="message-field"
                    value={contactText}
                    onChange={(event) => {
                        setContactText(event.target.value);
                    }}
                    maxLength={maxLength}
                />
                <p>{maxLength - contactText.length} characters remaining</p>
                <button>Submit</button>
            </form>

            {isModalOpen && (
                <Modal handleDismiss={toggleIsModalOpen}>
                    <h2 style={{ color: "green" }}>
                        Your message has been successfully sent!
                    </h2>
                    <h4>You help us grow!</h4>
                    <img
                        className="image"
                        src="/images/Modal/Feedback.png"
                        alt="feedback"
                    />
                </Modal>
            )}
        </div>
    );
}
