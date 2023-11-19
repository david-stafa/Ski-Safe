import axios from "axios";
import React, { useEffect, useState } from "react";
import { types } from "../homepage/contactUs/types";

export default function Archive() {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        axios
            .get("/api/messages")
            .then((response) => {
                setMessages(response.data);
            })
            .catch((error) => {
                console.error("There was an error!", error);
            });
    }, []);
    return (
        <div className="message-container">
            <h1 className="message-header">Check messages from contact list</h1>
            <table className="message-table">
                <thead className="table-header">
                    <tr>
                        <th>ID</th>
                        <th>User</th>
                        <th>Category</th>
                        <th>Message</th>
                        <th>Status</th>
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
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
