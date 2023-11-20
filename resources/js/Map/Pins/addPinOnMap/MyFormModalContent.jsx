import React, { useEffect, useState } from "react";
import axios from "axios";
import mapboxgl, { Map } from "mapbox-gl";
import { addHazardLayer } from "../addHazardLayer";

export let handleFetch = false;

export const MyFormModalContent = ({
    coordinates,
    marker,
    markerOnMap,
    map,
    details,
}) => {
    const [formData, setFormData] = useState({
        id: details?.id || null,
        title: details?.title || "",
        description: details?.description || "",
        latitude: details?.latitude || coordinates[1],
        longitude: details?.longitude || coordinates[0],
        severity_id: details?.severity_id || 1,
        severity: details?.severtiy || 1,
        slug: details?.slug || "",
        active: true,
    });

    const [toggleContent, setToggleContent] = useState(true);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(details);
        try {
            if (!details) {
                const response = await axios.post("/api/pin/store", formData);
                console.log("Your pin was successfully created", response.data);
                setToggleContent(false);
                markerOnMap = false;
                handleFetch = true;
                marker.remove();
                addHazardLayer(map);
            } else {
                const response = await axios.post(
                    `api/map-pins/edit/${details.id}`,
                    formData
                );
                console.log("Your pin was successfully edited", response.data);
                setToggleContent(false);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        if (map) {
            console.log("updated");
        }
    }, [handleFetch]);

    return (
        <div className="register-container">
            {toggleContent ? (
                <form action="" onSubmit={handleSubmit}>
                    <div className="register-header">
                        {details?.id ? (
                            <h2>Edit a pin number {details.id}</h2>
                        ) : (
                            <h2>Create a pin</h2>
                        )}
                    </div>
                    <div className="input-group">
                        <label htmlFor="title">Title</label>
                        <input
                            id="title"
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="input-field"
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="slug">Slug</label>
                        <input
                            type="text"
                            name="slug"
                            id="slug"
                            value={formData.slug}
                            onChange={handleChange}
                            className="input-field"
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                            name="description"
                            id="description"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="severity_id">Severity state</label>
                        <select
                            name="severity_id"
                            id="severity_id"
                            value={formData.severity_id || ""}
                            onChange={handleChange}
                            className="input-field"
                        >
                            <option value="2">Low</option>
                            <option value="3">Moderate</option>
                            <option value="4">High</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="submit-button submit-button_registration"
                    >
                        Submit
                    </button>
                </form>
            ) : (
                <div>
                    {details?.id ? (
                        <h1>You have succesfully updated this pin</h1>
                    ) : (
                        <h1>You have successfully submitted new pin</h1>
                    )}
                </div>
            )}
        </div>
    );
};
