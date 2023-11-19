import axios from "axios";
import Modal from "../../components/Modal/Modal";
import useToggle from "../../components/Modal/use-toggle";

export default function DeletePin({ details }) {
    const [isModalOpen, toggleIsModalOpen] = useToggle(false);

    const userConfirmed = window.confirm(
        "Are you sure you want to delete this pin?"
    );
    const performDelete = async (id) => {
        if (userConfirmed) {
            try {
                const response = await axios.delete(`/api/map-pins/${id}`);
                console.log(
                    `Pin ${id} was deleted from the database`,
                    response.data
                );
            } catch (error) {
                console.error(
                    "No record with this ID exists in the Database",
                    error
                );
            }
        } else {
            console.log("deletion aborted");
        }
    };
    performDelete(details.id);

    return (
        <>
            {isModalOpen && (
                <Modal handleDismiss={toggleIsModalOpen}>
                    <p>Pin Deleted succesfully.</p>
                    <img
                        className="image"
                        src="/images/Modal/Modal.png"
                        alt="modal"
                    />
                </Modal>
            )}
        </>
    );
}
