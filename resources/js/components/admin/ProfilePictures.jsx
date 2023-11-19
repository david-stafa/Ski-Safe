import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "./ProfilePictures.scss";

export default function ProfilePictures() {
    const [upload, setUpload] = useState([]);

    useEffect(() => {
        const loadUploads = () => {
            fetch("/api/uploads")
                .then((res) => {
                    return res.json();
                })
                .then((response) => {
                    // console.log(response.uploads);
                    setUpload(response.uploads);
                    //console.log(response);
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        loadUploads();
    }, []);

    const deleteUpload = (id) => {
        axios
            .delete(`http://www.skisafe.test/api/uploadsdelete/${id}`)
            .then((response) => {
                //  console.log(response.data);
                alert("You have successfully deleted your picture!");
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            });
    };

    return (
        <>
            <h1 className="pictures-header">PICTURES</h1>
            <table className="pictures-table">
                <thead>
                    <tr>
                        <th>User</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Image</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {upload.map((image, index) => (
                        <tr key={index} className="picture-row">
                            <td>{image.user.email}</td>
                            <td>{image.name}</td>
                            <td>{image.description}</td>
                            <td className="image-cell">
                                <img
                                    src={`/storage/${image.image}`}
                                    alt={image.name}
                                    className="profile-image"
                                />
                            </td>
                            <td className="action-cell">
                                <Link
                                    to={`/editupload/${image.id}/edit`}
                                    className="edit-link"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() => deleteUpload(image.id)}
                                    className="delete-button"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}
