import axios from "axios";
import { useContext, useState } from "react";
import UserContext from "../../../context/UserContext";

export default function ThreadCRUD({
    refreshFetch,
    setRefreshFetch,
    threadData,
    id,
    setOpenEdit,
    refreshThread,
    forumData,
    setForumData
}) {
    const { user, setUser } = useContext(UserContext);
    const [errors, setErrors] = useState();
    const [createThread, setCreateThread] = useState({
        user_id: user.id,
        title: threadData?.title || "",
        content: threadData?.content || "",
    });

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

        // clear the errors
        setErrors({});

        try {
            if (threadData) {
                const response = await axios.post(
                    `/api/forum/threads/update/${id}`,
                    createThread
                );
                // refreshes feth for current thread after post
                refreshThread(true)
                // closes the edit form
                setOpenEdit(false)
                redirect(`/forum/thread/${id}`);
            } else{
            const response = await axios.post(
                "/api/forum/threads/create",
                createThread
            );}
            // refreshes fetch for ALL threads after post
            setRefreshFetch(!refreshFetch);
            // toggles creation window off
            setForumData({
                ...forumData,
                toggleForm: !forumData.toggleForm,
            });
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

    console.log(createThread);

    return (
        <form action="" onSubmit={handleSubmit} className="thread__form">
            <h3 className="thread__form__heading">Create a post</h3>
            <label htmlFor="title" className="thread__label">
                Title
            </label>
            <input
                type="text"
                name="title"
                id="title"
                onChange={handleChange}
                value={createThread.title}
                className="thread__form__input"
            />

            <label htmlFor="content" className="thread__form__label">
                Content
            </label>
            <textarea
                type="text-field"
                name="content"
                id="content"
                onChange={handleChange}
                value={createThread.content}
                className="thread__form__textarea"
            />
            <button className="thread__form__button">Create a post</button>
        </form>
    );
}
