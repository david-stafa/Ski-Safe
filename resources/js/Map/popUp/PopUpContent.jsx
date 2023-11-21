import React, { useState, useContext, useEffect } from "react";
// import UserContext from "../../context/UserContext";

export default function PopUpContent({
    isModalOpen,
    toggleIsModalOpen,
    details,
    user,
}) {
    // const { user, setUser } = useContext(UserContext);

    const [waitingTime, setWaitingTime] = useState(5);

    const handleClick = () => {
        toggleIsModalOpen(!isModalOpen);
    };
    const handleIncreaseClick = () => {
        const newWaitingTime = waitingTime + 5;
        setWaitingTime(newWaitingTime);
    };

    const handleDecreaseClick = () => {
        let newWaitingTime = waitingTime;
        newWaitingTime < 6 ? (newWaitingTime = 0) : (newWaitingTime -= 5);
        setWaitingTime(newWaitingTime);
    };

    return (
        <>
            <h1>{details.title}</h1>

            {details.type_id !== 2 ? (
                <>
                    {details.severity_id > 1 && <p>{details.severity}</p>}
                    <p>{details.slug}</p>

                    <button
                        className="more-details-button"
                        onClick={handleClick}
                    >
                        MoreDetails
                    </button>
                </>
            ) : (
                <>
                    <>
                        <h4>Waiting Time</h4>
                        <h2>{waitingTime} min</h2>
                    </>
                    {details.type_id === 2 && user && user.role === "admin" && (
                        <>
                            <button onClick={handleIncreaseClick}>+</button>
                            <button onClick={handleDecreaseClick}>-</button>
                        </>
                    )}
                </>
            )}
        </>
    );
}
