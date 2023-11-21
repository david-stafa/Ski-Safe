import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import mapboxgl, { Map } from "mapbox-gl";
import { addHazardLayer } from "../addHazardLayer";
import "./myFormModalContent.scss";
import UserContext from "../../../context/UserContext";
import Modal from "../../../components/Modal/Modal";

export let handleFetch = false;

export const MyFormModalContent = ({
    coordinates,
    map,
    details,
    toggleIsMyFormModalOpen,
}) => {
    const { user, setUser } = useContext(UserContext);
    const [formData, setFormData] = useState({
        id: details?.id || null,
        title: details?.title || "",
        description: details?.description || "",
        latitude: details?.latitude || coordinates[1],
        longitude: details?.longitude || coordinates[0],
        severity_id: details?.severity_id || 1,
        severity: details?.severtiy || 1,
        type_id: details?.type_id || 1,
        slug: details?.slug || "",
        active: true,
    });

    const [toggleContent, setToggleContent] = useState(true);

    const handleChange = (e) => {
        if (e.target.name === "type_id" && e.target.value === "") {
            return;
        }
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.type_id === null) {
            alert("Please select a type");
            return;
        }
        try {
            if (!details) {
                const response = await axios.post("/api/pin/store", formData);
                console.log("Your pin was successfully created", response.data);
                setToggleContent(false);
                handleFetch = true;
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
        <Modal handleDismiss={toggleIsMyFormModalOpen}>
            <div className="register-container">
                {toggleContent ? (
                    <form
                        className="modalContent-data"
                        action=""
                        onSubmit={handleSubmit}
                    >
                        <div className="register-header">
                            {details?.id ? (
                                <h2>Edit a pin number {details.id}</h2>
                            ) : (
                                <h2 className="create-pin-title">
                                    CREATE A PIN
                                </h2>
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
                                className="input-field-createPin"
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
                                className="input-field-createPin"
                            />
                        </div>

                        <div className="input-group">
                            <label htmlFor="description">Description</label>
                            <textarea
                                name="description"
                                id="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="input-field-createPin"
                            />
                        </div>

                        <div className="input-group">
                            <label htmlFor="severity_id">Severity</label>
                            <select
                                name="severity_id"
                                id="severity_id"
                                value={formData.severity_id || ""}
                                onChange={handleChange}
                                className="input-field"
                            >
                                <option value="1">Not Applicable</option>
                                <option value="2">Low</option>
                                <option value="3">Moderate</option>
                                <option value="4">High</option>
                            </select>
                        </div>

                        <div className="input-group">
                            <label htmlFor="type_id">Type</label>
                            <select
                                name="type_id"
                                id="type_id"
                                value={formData.type_id}
                                onChange={handleChange}
                                className="input-field"
                            >
                                <option value="">Please Select</option>
                                {user && user.role === "admin" && (
                                    <>
                                        <option value="1">Hazard</option>
                                        <option value="2">Lift</option>
                                    </>
                                )}
                                <option value="3">Powder Of Interest</option>
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
                    <div id="success-message">
                        {details?.id ? (
                            <h1>You have successfully updated this pin</h1>
                        ) : (
                            <h1>You have successfully submitted new pin</h1>
                        )}
                    </div>
                )}
            </div>
        </Modal>
    );
};
