import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import mapboxgl, { Map } from "mapbox-gl";
import { addHazardLayer } from "../addHazardLayer";
import "./myFormModalContent.scss";
import UserContext from "../../../context/UserContext";
import Modal from "../../../components/Modal/Modal";
import loadLayers from "./loadLayers";

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
    const [selectedFile, setSelectedFile] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.type_id === null) {
            alert("Please select a type");
            return;
        }

        try {
            let response;
            if (!details) {
                response = await axios.post("/api/pin/store", formData);
            } else {
                response = await axios.post(
                    `/api/map-pins/edit/${details.id}`,
                    formData
                );
            }
            // console.log("Pin data processed", response.data);
            const mapPinId = response.data.id;

            if (selectedFile) {
                const imageFormData = new FormData();
                imageFormData.append("image", selectedFile);
                imageFormData.append("map_pin_id", mapPinId);
                imageFormData.append("name", formData.title);
                imageFormData.append("description", formData.slug);

                let imageResponse = await axios.post(
                    "/api/uploads",
                    imageFormData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
                // console.log("Image uploaded", imageResponse.data);
            }

            setToggleContent(false);
            handleFetch = true;
            loadLayers(map);
        } catch (error) {
            console.error("Error:", error);
            alert(
                "If you are uploading image, please use (jpeg, png, jpg, gif, svg) up to 2 MB."
            );
        }
    };

    useEffect(() => {
        if (map) {
            console.log("Map updated");
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

                        <div className="input-group">
                            <label htmlFor="imageupload">Upload Image</label>
                            <input
                                type="file"
                                name="imageupload"
                                id="imageupload"
                                onChange={handleFileChange}
                                className="input-field"
                            />
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
