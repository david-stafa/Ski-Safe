import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import useToggle from "../Modal/use-toggle";
import Modal from "../Modal/Modal";
import { ThumbsUp } from "react-feather";

import "./EditUpload.scss";

export default function EditUpload() {
    const { id } = useParams();

    const [inputs, setInputs] = useState({ name: "", description: "" });
    const [isModalOpen, toggleIsModalOpen] = useToggle(false);
    const [file, setFile] = useState("");

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs((values) => ({ ...values, [name]: value }));
    };

    const uploadUpload = async () => {
        const formData = new FormData();
        formData.append("_method", "PUT");
        formData.append("name", inputs.name);
        formData.append("description", inputs.description);

        if (file) {
            formData.append("image", file);
        }

        try {
            const response = await axios.post(
                `http://www.skisafe.test/api/uploadsupdate/${id}`,
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );
            // console.log(response);
            response ? toggleIsModalOpen(true) : "";
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

    const handleSubmit = async (event) => {
        event.preventDefault();

        await uploadUpload();
    };

    useEffect(() => {
        getupload();
    }, []);

    const getupload = () => {
        axios
            .get(`http://www.skisafe.test/api/uploads/${id}`)
            .then((response) => {
                console.log(response.data);
                setInputs(response.data.upload);
            });
    };

    return (
        <>
            <h1 className="edit-header">Edit</h1>
            <form className="edit-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        required
                        type="text"
                        id="name"
                        name="name"
                        value={inputs.name}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Short Description:</label>
                    <input
                        required
                        type="text"
                        id="description"
                        name="description"
                        value={inputs.description}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="file">Profile Picture</label>
                    <img
                        src={`/storage/${inputs.image}`}
                        alt={inputs.name}
                        className="profile-image-preview"
                    />
                    <input
                        type="file"
                        id="file"
                        onChange={(event) => setFile(event.target.files[0])}
                    />
                </div>

                <button type="submit" className="edit-submit-button">
                    Edit Picture
                </button>
            </form>

            {isModalOpen && (
                <Modal handleDismiss={toggleIsModalOpen}>
                    <h2 style={{ color: "green" }}>
                        Your Profile picture has been successfully updated!
                    </h2>
                    <ThumbsUp />
                </Modal>
            )}
        </>
    );
}
