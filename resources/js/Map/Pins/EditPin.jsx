import React, { useState } from "react";
import axios from "axios";
import { CheckCircle } from "react-feather";
export default function EditPin({ id }) {
    const [pinDetails, setPinDetails] = useState("");
    const [message, setMessage] = useState(null);

    const loadPin = async () => {
        try {
            axios.get(`api/map-pins/show/${id}`); // will need to correctly pass id through using state from showPopUp
            const data = response.data;
            // console.log(data)
            setPinDetails(data);
        } catch (error) {
            console.error("There was an error retrieving the pin data", error);
        }
    };
    return (
        <>
            <h1>Edit Pin: {pinDetails.id}</h1>
            {pinDetails && (
                <div className="pin-edit_form">
                    {message ? <span>{message}</span> : ""}
                    <form action="" onSubmit={sendData}>
                        <label htmlFor="title">Title:</label> <br />
                        <input
                            type="text"
                            name="title"
                            id="title"
                            value={pinDetails.title}
                            onChange={handleChange}
                        />
                        <br />
                        <br />
                        <label htmlFor="severity_id">Severity:</label>
                        <select
                            name="severity_id"
                            id="severity_id"
                            value={pinDetails.severity || ""}
                            onChange={handleChange}
                        >
                            <option value={1}>Low</option>
                            <option value={2}>Moderate</option>
                            <option value={3}>High</option>
                        </select>
                        <br />
                        <br />
                        <label htmlFor="slug">Slug:</label>
                        <input
                            type="text"
                            name="slug"
                            id="slug"
                            value={pinDetails.slug}
                            onChange={handleChange}
                        />
                        <br />
                        <br />
                        <label htmlFor="video">Video:</label>
                        <input
                            type="text"
                            name="video"
                            id="video"
                            value={pinDetails.video}
                            onChange={handleChange}
                        />
                        <br />
                        <br />
                        <label htmlFor="image">Image:</label>
                        <input
                            type="image"
                            name="image"
                            id="image"
                            value={pinDetails.image}
                            onChange={handleChange}
                        />
                        <br />
                        <br />
                        <label htmlFor="active">Active:</label>
                        <select
                            name="active"
                            id="active"
                            value={pinDetails.active}
                            onChange={handleChange}
                        >
                            <option value={1}>Active</option>
                            <option value={2}>Deactivate</option>
                        </select>
                        <br />
                        <br />
                        <button type="submit">Update</button>
                    </form>
                </div>
            )}
            <button onClick={() => setMissionId(null)}>&times;</button>
        </>
    );
}
