import React, { useState } from "react";
import "./contactUs.scss";

import { types } from "./types";
import FieldsetBox from "./FieldsetBox/FieldsetBox";

const typeNames = Object.entries(types);

export default function ContactUs() {
    const [type, setType] = useState("");
    const [contactText, setContactText] = useState("");

    return (
        <div className="contact-container">
            <div className="contact-header">
                <h1>CONTACT US</h1>
            </div>

            <form
                className="contact-form"
                onSubmit={(event) => {
                    event.preventDefault();
                }}
            >
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
                    id="message-field"
                    value={contactText}
                    onChange={(event) => {
                        setContactText(event.target.value);
                    }}
                />

                <button>Submit</button>
            </form>
        </div>
    );
}
