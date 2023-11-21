import { useNavigate } from "react-router-dom";

export default function ForumThreads({ forumData }) {

    const navigate = useNavigate();

    const navigateToThreadsDetail = (id) => {
        // 👇️ navigate to /contacts
        navigate(`/forum/thread/${id}`);
    };



    const renderThreads = forumData.threads.map((event, i) => {

        const date = new Date(event.updated_at).toLocaleDateString();
        const time = event.updated_at.slice(11, 17);


        return (
            <div className="forum" key={i} onClick={() => navigateToThreadsDetail(event.id)}>
                <span>{event.user?.name || "User"}</span>{" "}
                <div>
                    Posted: {date}, {time}
                </div>
                <h1>{event.title}</h1>
            </div>
        );
    });

    return <>{renderThreads}</>;
}
