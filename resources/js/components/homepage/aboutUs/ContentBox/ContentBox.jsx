import React from "react";

export default function ContentBox({ title, text, Icon }) {
    return (
        <div className="flex-item">
            <div className="icon-container">
                <Icon />
            </div>
            <h2 className="content-title">{title}</h2>
            <p className="content-text">{text}</p>
        </div>
    );
}
