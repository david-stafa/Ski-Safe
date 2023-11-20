export default function AddPinContent({
    isMyFormModalOpen,
    toggleIsMyFormModalOpen,
    coordinates,
}) {
    const handleClick = () => {
        toggleIsMyFormModalOpen(!isMyFormModalOpen);
    };

    return (
        <>
            <div className="pop-up">
                <h3>
                    [{coordinates[0]}, {coordinates[1]}]
                </h3>
                <button onClick={handleClick}>Create a pin</button>
            </div>
        </>
    );
}
