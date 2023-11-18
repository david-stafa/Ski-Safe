import React, { useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import useToggle from "../Modal/use-toggle";
import axios from "axios";

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
        <>
            <h1>Profile Picture</h1>

            <h4>If picture, see picture + EDIT + DELETE</h4>

            <h4>No picture, see ADD</h4>
            <form className="picture-form" onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input
                    required
                    placeholder="Write short name..."
                    type="text"
                    id="name"
                    value={name}
                    onChange={(event) => {
                        setName(event.target.value);
                    }}
                />
                <br />

                <label htmlFor="description">Short Description:</label>
                <input
                    required
                    type="text"
                    id="description"
                    value={description}
                    onChange={(event) => {
                        setDescription(event.target.value);
                    }}
                />
                <br />

                <label htmlFor="file">Profile Picture</label>
                <input
                    required
                    type="file"
                    id="file"
                    onChange={(event) => {
                        setFile(event.target.files[0]);
                    }}
                />
                <br />

                <button type="submit">Add Picture</button>
            </form>

            {isModalOpen && (
                <Modal handleDismiss={toggleIsModalOpen}>
                    <h2 style={{ color: "green" }}>
                        Your Profile picture has been succesfully updated!
                    </h2>
                </Modal>
            )}
        </>
    );
}
