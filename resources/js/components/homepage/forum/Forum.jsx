import axios from "axios";
import { useContext, useEffect, useState } from "react";
import ForumThreads from "./Threads";
import ThreadCRUD from "./ThreadCRUD";
import UserContext from "../../../context/UserContext";


export default function Forum() {
    const [forumData, setForumData] = useState({
        toggleForm: false,
        threads: [],
        posts: [],
    });

    const[refreshFetch, setRefreshFetch]=useState(false)
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
            {user && (
                <button
                    onClick={() =>
                        setForumData({ ...forumData, toggleForm: !forumData.toggleForm })
                    }
                >
                    { forumData.toggleForm ? 'Stop posting' : 'Post something' }
                </button>
            )}
            {forumData.toggleForm ? (
                <>

                    <ThreadCRUD
                        refreshFetch={refreshFetch}
                        setRefreshFetch={setRefreshFetch}
                    />

                </>
            ) : (
                ""
            )}

            <div className="forum__box"><ForumThreads forumData={forumData} /></div>
        </>
    );
}
