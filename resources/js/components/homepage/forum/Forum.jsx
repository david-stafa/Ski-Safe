import axios from "axios";
import { useEffect, useState } from "react";
import ForumThreads from "./ForumThreads";
import ThreadCRUD from "./ThreadCRUD";

export default function Forum() {
    const [forumData, setForumData] = useState({
        toggleForm: false,
        threads: [],
        posts: [],
        createThread: null,
    });

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
    }, []);

    console.log(forumData);

    return (
        <>
            <button onClick={() => setForumData({ ...forumData, toggleForm: true })}>
                Post something
            </button>
            {forumData.toggleForm ? (
                <>
                    <button onClick={() =>setForumData({ ...forumData, toggleForm: false })}>
                        Cancel posting
                    </button>
                    <ThreadCRUD />
                </>
            ) : (
                ""
            )}
            
            <ForumThreads forumData={forumData} />
        </>
    );
}
