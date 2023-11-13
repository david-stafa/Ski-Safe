import "./aboutUs.scss";
import ContentBox from "./ContentBox/ContentBox";
import CreatorBox from "./CreatorBox/CreatorBox";

import { teamMembers } from "./teamMembers";
import { contentData } from "./contentData";

export default function AboutUs() {
    return (
        <div className="about-container">
            <header className="about-header">
                <h1>Ski Safe Team</h1>
            </header>

            <div className="flex-container">
                {contentData.map((data) => (
                    <ContentBox
                        key={data.id}
                        title={data.title}
                        text={data.text}
                    />
                ))}
            </div>

            <div className="creators-container">
                {teamMembers.map((member) => (
                    <CreatorBox
                        key={member.id}
                        src={member.src}
                        alt={member.alt}
                        title={member.title}
                        bio={member.bio}
                    />
                ))}
            </div>
        </div>
    );
}
