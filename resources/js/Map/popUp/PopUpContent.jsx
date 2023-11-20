export default function PopUpContent({
    isModalOpen,
    toggleIsModalOpen,
    details,
}) {
    const handleClick = () => {
        toggleIsModalOpen(!isModalOpen);
    };

    return (
        <>
            {details.title && <h1>{details.title}</h1>}
            {details.severity && <p>{details.severity}</p>}
            {details.type_id === 2} && <p>Waiting time is 10min</p>
            {details.slug && <p>{details.slug}</p>}
            <button className="more-details-button" onClick={handleClick}>
                MoreDetails
            </button>
        </>
    );
}
