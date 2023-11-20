import React, { useState, useEffect } from "react";
import axios from "axios";
import { types } from "../homepage/contactUs/types";
import { Link } from "react-router-dom";

import "./CheckMessages.scss";

export default function CheckMessages() {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        axios
            .get("/api/messages")
            .then((response) => {
                const unreadMessages = response.data.filter(
                    (message) => !message.read
                );
                setMessages(unreadMessages);
            })
            .catch((error) => {
                console.error("There was an error!", error);
            });
    }, []);

    function markAsRead(messageId) {
        axios
            .put(`/api/messages/${messageId}`)
            .then(() => {
                setMessages(
                    messages.map((msg) => {
                        if (msg.id === messageId) {
                            return { ...msg, read: true };
                        }
                        return msg;
                    })
                );
            })
            .catch((error) => {
                console.error("Error updating message status", error);
            });
    }

    return (
        <div className="message-container">
            <h1 className="message-header">RECEIVED MESSAGES</h1>
            <table className="message-table">
                <thead className="table-header">
                    <tr>
                        <th>ID</th>
                        <th>User</th>
                        <th>Category</th>
                        <th>Message</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody className="table-body">
                    {messages.map((message) => (
                        <tr
                            key={message.id}
                            className={
                                message.read ? "message-read" : "message-unread"
                            }
                        >
                            <td>{message.id}</td>
                            <td>
                                {message.user ? message.user.email : "Guest"}
                            </td>
                            <td>{types[message.category]}</td>
                            <td>{message.message}</td>
                            <td>{message.read ? "Read" : "Unread"}</td>
                            <td>
                                <button onClick={() => markAsRead(message.id)}>
                                    Solve
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Link to={"/contact/archive"}>Archive</Link>
        </div>
    );
}
