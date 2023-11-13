import React from "react";

export default function ContentBox({ title, text }) {
    return (
        <div className="flex-item">
            <h2 className="content-title">{title}</h2>
            <p className="content-text">{text}</p>
        </div>
    );
}
