import React from "react";
import { Linkedin } from "react-feather";

export default function CreatorBox({ alt, src, title, bio, social }) {
    return (
        <div className="creator-box">
            <a
                href={social}
                target="_blank"
                rel="noopener noreferrer"
                className="linkedin-logo"
            >
                <Linkedin />
            </a>
            <img src={src} alt={alt} className="creator-image" />
            <p className="creator-title">{title}</p>
            <p className="creator-bio">{bio}</p>
        </div>
    );
}
