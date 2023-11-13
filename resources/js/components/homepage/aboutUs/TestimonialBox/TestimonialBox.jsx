import React from "react";
import "./TestimonialBox.scss";

export default function TestimonialBox({ testimonial, active, onClick }) {
    const className = `testimonial-item ${active ? "active" : ""}`;

    return (
        <div className={className} onClick={onClick}>
            <img
                src={testimonial.image}
                alt={testimonial.name}
                className="testimonial-image"
            />
            <blockquote className="testimonial-text">
                "{testimonial.text}"
            </blockquote>
            <p className="testimonial-author">- {testimonial.name}</p>
        </div>
    );
}
