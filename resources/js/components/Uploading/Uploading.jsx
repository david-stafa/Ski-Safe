import React, { useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import useToggle from "../Modal/use-toggle";
import axios from "axios";

import "./Uploading.scss";

export default function Uploading() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("Profile picture");
    const [file, setFile] = useState("");
    const [isModalOpen, toggleIsModalOpen] = useToggle(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("image", file);

        try {
            const response = await axios.post("/api/uploads", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            // console.log(response);
            response ? toggleIsModalOpen(true) : "";
            setName("");
            setDescription("");
            setFile("");
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        } catch (error) {
            console.error(
                "Something is wrong, picture is not updated: ",
                error
            );
            alert("Failed to update your picture. Please try again.");
        }
    };

    return (
        <div className="uploading-container">
            <h2 className="uploading-header">Profile Picture</h2>
            <h4 className="uploading-instruction">
                Oooh, what a shame. You have no profile picture mate!
            </h4>

            <form className="uploading-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        required
                        className="form-input"
                        placeholder="Write short name..."
                        type="text"
                        id="name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Short Description:</label>
                    <input
                        required
                        className="form-input"
                        type="text"
                        id="description"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="file">Profile Picture</label>
                    <input
                        required
                        className="form-input"
                        type="file"
                        id="file"
                        onChange={(event) => setFile(event.target.files[0])}
                    />
                </div>

                <button type="submit" className="upload-button">
                    Add Picture
                </button>
            </form>

            {isModalOpen && (
                <Modal handleDismiss={toggleIsModalOpen}>
                    <h2 style={{ color: "green" }}>
                        Your Profile picture has been successfully updated!
                    </h2>
                </Modal>
            )}
        </div>
    );
}
