import React from "react";
import "./aboutUs.scss";
import ContentBox from "./ContentBox/ContentBox";
import CreatorBox from "./CreatorBox/CreatorBox";

import { teamMembers } from "./teamMembers";
import { contentData } from "./contentData";
import { testimonials } from "./testimonials";
import { useEffect, useState } from "react";
import TestimonialBox from "./TestimonialBox/TestimonialBox";

export default function AboutUs() {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((current) => (current + 1) % testimonials.length);
        }, 8000);
        return () => clearInterval(interval);
    }, [testimonials.length]);

    const handleDotClick = (index) => {
        setActiveIndex(index);
    };

    return (
        <div className="about-container">
            <div className="about-header">
                <h1>ABOUT US</h1>
            </div>

            <div className="flex-container">
                {contentData.map((data) => (
                    <ContentBox
                        key={data.id}
                        title={data.title}
                        text={data.text}
                        Icon={data.Icon}
                    />
                ))}
            </div>

            <div className="about-header">
                <h2>Ski Safe Team</h2>
            </div>

            <div className="creators-container">
                {teamMembers.map((member) => (
                    <CreatorBox
                        key={member.id}
                        src={member.src}
                        alt={member.alt}
                        title={member.title}
                        bio={member.bio}
                        social={member.social}
                    />
                ))}
            </div>

            <div className="about-header">
                <h2>Testimonials</h2>
            </div>

            <div className="testimonials-section">
                {testimonials.map((testimonial, index) => (
                    <TestimonialBox
                        key={testimonial.id}
                        testimonial={testimonial}
                        active={index === activeIndex}
                        onClick={() => {
                            if (index !== activeIndex) {
                                setActiveIndex(index);
                            }
                        }}
                    />
                ))}
                <div className="testimonials-dots">
                    {testimonials.map((test, index) => (
                        <span
                            key={test.id}
                            className={`dot ${
                                index === activeIndex ? "active" : ""
                            }`}
                            onClick={() => handleDotClick(index)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
