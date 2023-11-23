import axios from "axios";
import { useState } from "react";

export default function PostCreate({ setOpenAnswer, openAnswer, id, setRefreshFetch, refreshFetch }) {
    const [createPost, setCreatePost] = useState({
        user_id: 1,
        content: "",
        forum_thread_id: id,
    });
    const [errors, setErrors] = useState();

    const handleSubmit = async (event) => {
        event.preventDefault();

        // clear the errors
        setErrors({});

        try {
            const response = await axios.post(
                "/api/forum/posts/create",
                createPost
            );
            setRefreshFetch(!refreshFetch);
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

    const handleChange = (event) => {
        setCreatePost((previous_values) => {
            return {
                ...previous_values,
                [event.target.name]: event.target.value,
            };
        });
    };

    return (
        <>
            <form action="" onSubmit={handleSubmit}>
                <textarea
                    name="content"
                    id="content"
                    cols="30"
                    rows="10"
                    value={createPost.content}
                    onChange={handleChange}
                ></textarea>
                <button onClick={() => setOpenAnswer(!openAnswer)}>Send answer</button>
            </form>
        </>
    );
}
