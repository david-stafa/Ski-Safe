import axios from "axios";
import { useContext, useState } from "react";
import UserContext from "../../../context/UserContext";

export default function PostCreate({ setOpenAnswer, openAnswer, id, setRefreshFetch, refreshFetch }) {
    const { user, setUser } = useContext(UserContext);
    const [createPost, setCreatePost] = useState({
        user_id: user?.id || null,
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
            setOpenAnswer(!openAnswer);
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
                <button className="forum__button">Send answer</button>
            </form>
        </>
    );
}
