import { useNavigate } from "react-router-dom";
import './thread.scss'

export default function ForumThreads({ forumData }) {

    const navigate = useNavigate();

    const navigateToThreadsDetail = (id) => {
        // 👇️ navigate to /contacts
        navigate(`/forum/thread/${id}`);
    };

console.log(forumData)

    const renderThreads = forumData?.threads.map((event, i) => {

        const date = new Date(event.updated_at).toLocaleString("cs-CZ", {
            dateStyle: "medium",
            timeStyle: "short",
        });


        return (
            <div className="forum" key={i} onClick={() => navigateToThreadsDetail(event.id)}>
                <div className="forum__user">
                    <img src={ event.user && event.user.uploads[0] && event.user.uploads[0].image  ? `/storage/${event.user.uploads[0].image}` : `/images/ProfilePic/Default.png`} alt="" className="forum__user__picture" />
                        <div className="forum__user__description">
                            <p className="forum__user__name">{event.user?.name || "User"}</p>
                            <div className="forum__user__data">
                                <p className="forum__user__data__posted">Posted on {date}</p>
                                <p className="forum__user__data__answers">Answers: {event.forum_post?.length}</p>
                            </div>
                        </div>
                </div>{" "}
                
                <div>
                </div>
                <h1>{event.title}</h1>
                <p>{event.content}</p>
            </div>
        );
    });

    return <>{renderThreads}</>;
}
