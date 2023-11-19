import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "./UserPictures.scss";

export default function UserPictures({ userUpload }) {
    const deleteUpload = (id) => {
        axios
            .delete(`http://www.skisafe.test/api/uploadsdelete/${id}`)
            .then((response) => {
                console.log(response.data);
                alert("You have successfully deleted your picture!");
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            })
            .catch((error) => {
                console.error("Error deleting the picture:", error);
                alert("Failed to delete the picture.");
            });
    };

    const setAsProfilePicture = (id) => {
        axios
            .post(
                `http://www.skisafe.test/api/uploads/${id}/set-profile-picture`
            )
            .then((response) => {
                alert("Profile picture updated successfully!");
                window.location.reload();
            })
            .catch((error) => {
                console.error("Error setting profile picture:", error);
                alert("Failed to set profile picture.");
            });
    };

    return (
        <div className="user-pictures">
            <h1 className="pictures-header">Your Pictures</h1>
            <table className="pictures-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Image</th>
                        <th>Actions</th>
                        <th>Profile Picture</th>
                    </tr>
                </thead>
                <tbody>
                    {userUpload.map((upload, index) => (
                        <tr key={index} className="picture-row">
                            <td>{index + 1}</td>
                            <td>{upload.name}</td>
                            <td>{upload.description}</td>
                            <td className="image-cell">
                                <img
                                    src={`/storage/${upload.image}`}
                                    alt={upload.name}
                                    className="profile-image"
                                />
                            </td>
                            <td className="action-cell">
                                <Link
                                    to={`/editupload/${upload.id}/edit`}
                                    className="edit-link"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() => deleteUpload(upload.id)}
                                    className="delete-button"
                                >
                                    Delete
                                </button>
                            </td>
                            <td className="action-cell">
                                {upload.is_profile_picture ? (
                                    <span>Currently used as profile</span>
                                ) : (
                                    <button
                                        className="set-profile-button"
                                        onClick={() =>
                                            setAsProfilePicture(upload.id)
                                        }
                                    >
                                        Set as profile picture
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
