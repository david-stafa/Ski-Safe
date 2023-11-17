import React, { useState, useRef } from "react";
import "./Uploading.scss";
import { Upload } from "react-feather";
import axios from "axios";

export default function Uploading(props) {
    const [highlight, setHighlight] = useState(false);
    const fileInputRef = useRef(null);

    const openFileDialog = () => {
        if (props.disabled) return;
        fileInputRef.current.click();
    };

    const onFilesAdded = (evt) => {
        if (props.disabled) return;
        const files = evt.target.files;
        if (props.onFilesAdded) {
            const array = fileListToArray(files);
            props.onFilesAdded(array);
        }

        const formData = new FormData();
        for (const file of files) {
            formData.append("file", file);
        }

        axios
            .post("/api/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => {
                console.log("File uploaded successfully", response.data);
            })
            .catch((error) => {
                console.error("Error uploading file", error);
            });
    };

    const onDragOver = (evt) => {
        evt.preventDefault();
        if (props.disabled) return;
        setHighlight(true);
    };

    const onDragLeave = () => {
        setHighlight(false);
    };

    const onDrop = (event) => {
        event.preventDefault();
        if (props.disabled) return;
        const files = event.dataTransfer.files;
        if (props.onFilesAdded) {
            const array = fileListToArray(files);
            props.onFilesAdded(array);
        }
        setHighlight(false);
    };

    const fileListToArray = (list) => {
        const array = [];
        for (var i = 0; i < list.length; i++) {
            array.push(list.item(i));
        }
        return array;
    };

    return (
        <div
            className={`Dropzone ${highlight ? "Highlight" : ""}`}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            onClick={openFileDialog}
            style={{ cursor: props.disabled ? "default" : "pointer" }}
        >
            <input
                ref={fileInputRef}
                className="FileInput"
                type="file"
                multiple
                onChange={onFilesAdded}
            />
            <Upload />
            <span>Drag n'drop or Click</span>
        </div>
    );
}
