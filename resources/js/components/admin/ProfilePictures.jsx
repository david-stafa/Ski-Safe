import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

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
                console.log(response.data);
                alert("You have successfully deleted your picture!");
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            });
    };

    return (
        <>
            <h2>pictures</h2>
            <ul>
                {upload.map((image, index) => (
                    <li key={index}>
                        Image Nr. {index + 1}, {image.name} its description:{" "}
                        {image.description} with{" "}
                        <img
                            src={`/storage/${image.image}`}
                            alt="{image.name}"
                            height={90}
                            width={90}
                        />
                        , here you can
                        <Link to={`/editupload/${image.id}/edit`}>EDIT</Link> or
                        <button onClick={() => deleteUpload(image.id)}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </>
    );
}
