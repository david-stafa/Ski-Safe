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
    const createdAt = new Date(thread?.created_at).toLocaleDateString();
    const updatedAt = new Date(thread?.updated_at).toLocaleDateString();
    const createdAtTime = thread?.created_at.slice(11, 17);
    const updatedAtTime = thread?.updated_at.slice(11, 17);

    const renderPosts = thread?.forum_post.map((event, i) => {

        //* Time variables for post
        const createdAtPost = new Date(event.created_at).toLocaleDateString();
        const updatedAtPost = new Date(event.updated_at).toLocaleDateString();
        const createdAtTimePost = event.created_at.slice(11, 17);
        const updatedAtTimePost = event.updated_at.slice(11, 17);

        return (
            <div className="post">
                <p>{event.user_id}</p>
                <p>
                    Created at: {createdAtPost}, {createdAtTimePost}
                </p>
                <p>
                    Updated at: {updatedAtPost}, {updatedAtTimePost}
                </p>
                <p>{event.content}</p>
            </div>
        );
    });

    useEffect(() => {
        loadThread();
    }, []);

    console.log(thread)

    return (
        <div className="thread">
            <div className="thread__heading">
                <h1>{thread?.title}</h1>
                <p>Author: {thread?.user.name}</p>
                <p>
                    Created at: {createdAt} {createdAtTime}
                </p>
                <p>
                    {" "}
                    Updated at: {updatedAt} {updatedAtTime}
                </p>
                <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ex
                    beatae temporibus amet odio labore porro, molestias rerum
                    neque eaque tempore quae tenetur voluptatem adipisci illo
                    quos quas deleniti quisquam obcaecati!
                </p>
            </div>
            <div className="posts">{renderPosts}</div>
        </div>
    );
}
