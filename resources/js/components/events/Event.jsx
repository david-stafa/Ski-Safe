import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import UserContext from "../../context/UserContext";
import "./events.scss";

export default function Event() {
    const [events, setEvents] = useState([]);
    const { user } = useContext(UserContext);
    const [editEventId, setEditEventId] = useState(null);

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

    const handleEventInputChange = (e) => {
        setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
    };

    const handleEventFormSubmit = async (e) => {
        e.preventDefault();
        const eventData = { ...newEvent, creator_id: user.id };

        if (editEventId) {
            // Update existing event
            try {
                await axios.put(`/api/events/${editEventId}`, eventData);
                setEditEventId(null); // Exit edit mode
            } catch (error) {
                console.error("Error updating event:", error);
            }
        } else {
            // Create new event
            try {
                await axios.post("/api/events", eventData);
            } catch (error) {
                console.error("Error creating event:", error);
            }
        }

        // Clear form and refresh events
        setNewEvent({
            title: "",
            description: "",
            start_date: "",
            end_date: "",
        });
        fetchEventsData();
    };

    const loadEventForEditing = async (eventId) => {
        try {
            const response = await axios.get(`/api/events/${eventId}`);
            setNewEvent({
                title: response.data.title,
                description: response.data.description,
                start_date: response.data.start_date,
                end_date: response.data.end_date,
            });
            setEditEventId(eventId);
        } catch (error) {
            console.error("Error loading event for editing:", error);
        }
    };

    const deleteEvent = async (eventId) => {
        try {
            await axios.delete(`/api/events/${eventId}`);
            fetchEventsData();
        } catch (error) {
            console.error("Error deleting event:", error);
        }
    };

    return (
        <>
            <section>
                <h2>Event Management</h2>
                <form onSubmit={handleEventFormSubmit}>
                    <input
                        type="text"
                        name="title"
                        placeholder="Event Title"
                        value={newEvent.title}
                        onChange={handleEventInputChange}
                    />
                    <textarea
                        name="description"
                        placeholder="Event Description"
                        value={newEvent.description}
                        onChange={handleEventInputChange}
                    />
                    <input
                        type="datetime-local"
                        name="start_date"
                        value={newEvent.start_date}
                        onChange={handleEventInputChange}
                    />
                    <input
                        type="datetime-local"
                        name="end_date"
                        value={newEvent.end_date}
                        onChange={handleEventInputChange}
                    />
                    <button type="submit">
                        {editEventId ? "Update Event" : "Create Event"}
                    </button>
                </form>
                <ul>
                    {events.map((event) => (
                        <li key={event.id}>
                            {event.title} {event.description},{" "}
                            {event.start_date}, {event.end_date}
                            <button onClick={() => deleteEvent(event.id)}>
                                Delete
                            </button>
                            <button
                                onClick={() => loadEventForEditing(event.id)}
                            >
                                Edit
                            </button>
                        </li>
                    ))}
                </ul>
            </section>
        </>
    );
}
