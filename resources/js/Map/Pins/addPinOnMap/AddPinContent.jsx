//Seems like we cannot use

export default function AddPinContent({
    isMyFormModalOpen,
    toggleIsMyFormModalOpen,
    coordinates,
    user,
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
                {user ? (
                    <button onClick={handleClick}>Create a pin</button>
                ) : (
                    <button>
                        <a href="/log-in">Log in</a>
                    </button>
                )}
            </div>
        </>
    );
}
