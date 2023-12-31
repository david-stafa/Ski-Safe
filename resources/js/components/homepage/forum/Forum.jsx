import axios from "axios";
import { useContext, useEffect, useState } from "react";
import ForumThreads from "./Threads";
import ThreadCRUD from "./ThreadCRUD";
import UserContext from "../../../context/UserContext";

import "./Forum.scss";

export default function Forum() {
    const [forumData, setForumData] = useState({
        toggleForm: false,
        threads: [],
        posts: [],
    });

    const [refreshFetch, setRefreshFetch] = useState(false);
    const { user, setUser } = useContext(UserContext);

    const forumThreads = async () => {
        try {
            const response = await axios.get("/api/forum/threads");
            setForumData({
                ...forumData,
                threads: response.data,
            });
        } catch (error) {
            console.error("Error fetching forum threads:", error);
        }
    };

    useEffect(() => {
        forumThreads();
    }, [refreshFetch]);

    console.log(forumData);

    return (
        <>
            <div className="forum-header">
                <h1>FORUM</h1>
                {user && (
                    <button
                        onClick={() =>
                            setForumData({
                                ...forumData,
                                toggleForm: !forumData.toggleForm,
                            })
                        }
                        className="forum__button"
                    >
                        {forumData.toggleForm ? "Stop posting" : "Post something"}
                    </button>
                )}
            </div>
            {forumData.toggleForm ? (
                <>
                    <ThreadCRUD
                        refreshFetch={refreshFetch}
                        setRefreshFetch={setRefreshFetch}
                        forumData={forumData}
                        setForumData={setForumData}
                    />
                </>
            ) : (
                ""
            )}

            <div className="forum__box">
                <ForumThreads forumData={forumData} />
            </div>
        </>
    );
}
