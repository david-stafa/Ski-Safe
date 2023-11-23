import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import UserContext from "../../context/UserContext";
import "./eventsHomepage.scss";

export default function EventOnHomepage() {
    const [events, setEvents] = useState([]);
    const { user } = useContext(UserContext);
    const [isOpen, setIsOpen] = useState(false);
    const [editEventId, setEditEventId] = useState(null);
    const sortedEvents = [...events].sort(
        (a, b) => new Date(a.start_date) - new Date(b.start_date)
    );

    const [newEvent, setNewEvent] = useState({
        title: "",
        description: "",
        start_date: "",
        end_date: "",
    });

    // Fetch events data
    const fetchEventsData = async () => {
        try {
            const response = await axios.get("/api/events");
            setEvents(response.data);
        } catch (error) {
            console.error("Error fetching events data:", error);
        }
    };

    useEffect(() => {
        fetchEventsData();
    }, []);
    return (
        <div className="event-box">
            <div className="event__top">
                <div className="event__top-paragraph">
                    <p className="title">
                        {sortedEvents.length > 0 ? sortedEvents[0].title : ""}
                    </p>
                </div>
                <img
                    src={`/images/EventLogo/Screenshot 2023-11-22 at 14.49.24.png`}
                    alt="picture-event"
                    className="event-picture"
                />
            </div>
            <div className="event__bottom">
                <div className="description">
                    <div className="description-row">
                        <span className="description-label">Description</span>
                        <p className="p-description">
                            {sortedEvents.length > 0
                                ? sortedEvents[0].description
                                : ""}
                        </p>
                    </div>
                    <div className="description-row">
                        <span className="description-label">Strat Date</span>
                        <p className="p-description-time">
                            {sortedEvents.length > 0
                                ? sortedEvents[0].start_date
                                : ""}
                        </p>
                    </div>
                    <div className="description-row">
                        <span className="description-label">End Date</span>
                        <p className="p-description-date">
                            {sortedEvents.length > 0
                                ? sortedEvents[0].end_date
                                : ""}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
