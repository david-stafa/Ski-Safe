import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PostCreate from "./PostCreate";
import ThreadCRUD from "./ThreadCRUD";
import UserContext from "../../../context/UserContext";

export default function ThreadDetail({ data }) {
    const [thread, setThread] = useState();
    const [openAnswer, setOpenAnswer] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [refreshFetch, setRefreshFetch] = useState(false);
    let { id } = useParams();
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    // Fetch for specific thread detail
    const loadThread = async () => {
        try {
            const response = await axios.get(`/api/forum/threads/${id}`);
            setThread(response.data);
        } catch (error) {
            console.error("Error fetching the data", error);
        }
    };

    // Time variables for thread
    const createdAt = new Date(thread?.created_at).toLocaleString("cs-CZ", {
        dateStyle: "short",
        timeStyle: "short",
    });
    const updatedAt = new Date(thread?.updated_at).toLocaleString("cs-CZ", {
        dateStyle: "short",
        timeStyle: "short",
    });

    const renderPosts = thread?.forum_post.map((event, i) => {
        //* Time variables for post
        const createdAtPost = new Date(event.created_at).toLocaleString(
            "cs-CZ",
            {
                dateStyle: "short",
                timeStyle: "short",
            }
        );
        const updatedAtPost = new Date(event.updated_at).toLocaleString(
            "cs-CZ",
            {
                dateStyle: "short",
                timeStyle: "short",
            }
        );

        return (
            <div className="thread__post__box" key={i}>
                <div className="thread__post__user">
                    <img
                        className="thread__post__user-picture"
                        src={
                            event.user &&
                            event.user.uploads[0] &&
                            event.user.uploads[0].image
                                ? `/storage/${event.user.uploads[0].image}`
                                : `/images/ProfilePic/Default.png`
                        }
                        alt="avatar"
                    />
                    <div className="thread__post__user-details">
                        <p className="thread__post__user-name">
                            {event.user?.name}
                        </p>
                        <p className="thread__post__created-at">
                            Created at: {createdAtPost}
                        </p>
                    </div>
                </div>
                <p className="thread__post__content">{event.content}</p>

                {(user.id === event.user_id || user.role === "admin") && (
                    <button
                        onClick={() => deletePost(thread.id, event.id)}
                        className="thread__post__button-delete forum__button button__delete"
                    >
                        Delete post
                    </button>
                )}
            </div>
        );
    });

    const deleteThread = (id) => {
        axios.delete(`/api/forum/threads/delete/${id}`).then((response) => {
            //  console.log(response.data);
            alert("You have successfully deleted your thread!");
            navigate("/forum");
        });
    };

    const deletePost = (threadID, postID) => {
        axios.delete(`/api/forum/posts/delete/${postID}`).then((response) => {
            //  console.log(response.data);
            alert("You have successfully deleted your post!");
            setRefreshFetch(!refreshFetch);
        });
    };

    const navigateToContacts = () => {
        navigate("/forum");
    };

    useEffect(() => {
        loadThread();
    }, [refreshFetch]);

    console.log(thread);
    console.log(user);

    return (
        <div className="thread">
            <div className="thread__buttons">
                {(user?.id === thread?.user_id || user.role === "admin") && (
                    <>
                        <button
                            onClick={() => setOpenEdit(!openEdit)}
                            className="forum__button"
                        >
                            {openEdit ? "Cancel editting" : "Edit"}
                        </button>
                        <button
                            onClick={() => deleteThread(thread.id)}
                            className="button__delete forum__button"
                        >
                            Delete
                        </button>
                    </>
                )}
                <button onClick={navigateToContacts} className="forum__button">
                    Back to Forum
                </button>
            </div>
            {openEdit ? (
                <ThreadCRUD
                    threadData={thread}
                    id={id}
                    setOpenEdit={setOpenEdit}
                    refreshThread={setRefreshFetch}
                />
            ) : (
                <>
                    <div className="thread__heading">
                        <div className="thread__heading__user">
                            <img
                                src={
                                    thread?.user &&
                                    thread.user.uploads[0] &&
                                    thread.user.uploads[0].image
                                        ? `/storage/${thread.user.uploads[0].image}`
                                        : `/images/ProfilePic/Default.png`
                                }
                                alt=""
                            />
                            <div className="hread__heading__user__description">
                                <p className="author">Author: {thread?.user?.name}</p>
                                <p className="time_details">
                                    Created at: {createdAt}
                                </p>
                                <p className="time_details">
                                    {" "}
                                    Updated at: {updatedAt}
                                </p>
                            </div>
                        </div>
                        <h1>{thread?.title}</h1>
                        <p>{thread?.content}</p>
                    </div>
                    {user && (
                        <button
                            onClick={() => setOpenAnswer(!openAnswer)}
                            className="forum__button margin__button"
                        >
                            {openAnswer ? "Stop answering" : "Answer here"}
                        </button>
                    )}
                    {openAnswer ? (
                        <>
                            <PostCreate
                                setOpenAnswer={setOpenAnswer}
                                openAnswer={openAnswer}
                                id={id}
                                setRefreshFetch={setRefreshFetch}
                                refreshFetch={refreshFetch}
                            />
                        </>
                    ) : (
                        ""
                    )}
                    <div className="thread__posts">{renderPosts}</div>
                </>
            )}
        </div>
    );
}
