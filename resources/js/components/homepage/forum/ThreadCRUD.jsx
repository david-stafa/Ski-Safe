import axios from "axios";
import { useState } from "react";

export default function ThreadCRUD() {

    const[errors, setErrors]=useState()
    const[createThread, setCreateThread]=useState({
        user_id: 1,
        title: '',
        content: '',
    })

    const handleChange = (event) => {
        setCreateThread((previous_values) => {
            return {
                ...previous_values,
                [event.target.name]: event.target.value,
            };
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // // clear the errors
        setErrors({});
        
        try {
            const response = await axios.post("api/forum/threads/create", createThread);
        } catch (error) {
            if (error.response && error.response.status === 422) {
                console.log(
                    "VALIDATION FAILED:",
                    error.response.data.errors,
                    setErrors(error.response.data.errors)
                );
            } else {
                console.log("ERROR", error);
                setErrors({ general: ["An unexpected error occurred."] });
            }
        }
    };

    console.log(createThread)

    return (
        <form action="" onSubmit={handleSubmit}>
            <label htmlFor="title">Title</label>
            <input
                type="text"
                name="title"
                id="title"
                onChange={handleChange}
                value={createThread.title}
            />

            <label htmlFor="content">Content</label>
            <input
                type="text-field"
                name="content"
                id="content"
                onChange={handleChange}
                value={createThread.content}
            />
            <button>Create a post</button>
        </form>
    );
}