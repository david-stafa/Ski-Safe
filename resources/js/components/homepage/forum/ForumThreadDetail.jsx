import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ForumThreadDetail({ data }) {
    const [thread, setThread] = useState();
    let { id } = useParams();

    const loadThread = async () => {
        try {
            const response = await axios.get(`/api/forum/threads/${id}`);
            setThread(response.data);
        } catch (error) {
            console.error("Error fetching the data", error);
        }
    };

    //* Time variables for thread
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
            <div className="post" key={i}>
                <p>{event.user_id}</p>
                <p>
                    Created at: {createdAtPost}
                </p>
                <p>
                    Updated at: {updatedAtPost}
                </p>
                <p>{event.content}</p>
            </div>
        );
    });

    useEffect(() => {
        loadThread();
    }, []);

    console.log(thread);

    return (
        <div className="thread">
            <div className="thread__heading">
                <h1>{thread?.title}</h1>
                <p>Author: {thread?.user?.name}</p>
                <p>
                    Created at: {createdAt}
                </p>
                <p>
                    {" "}
                    Updated at: {updatedAt}
                </p>
                <p>
                    {thread?.content}
                </p>
            </div>
            <div className="posts">{renderPosts}</div>
        </div>
    );
}
