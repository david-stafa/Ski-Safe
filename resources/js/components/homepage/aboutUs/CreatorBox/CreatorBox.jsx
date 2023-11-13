import React from "react";

export default function CreatorBox({ alt, src, title, bio }) {
    return (
        <div className="creator-box">
            <img src={src} alt={alt} className="creator-image" />
            <p className="creator-title">{title}</p>
            <p className="creator-bio">{bio}</p>
        </div>
    );
}
