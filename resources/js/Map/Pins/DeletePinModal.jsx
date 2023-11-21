import axios from "axios";
import React, { useEffect } from "react";
import useToggle from "../../components/Modal/use-toggle";

export default function DeletePinModal({ details }) {
    const [successModal, toggleSuccessModal] = useToggle(false);
    const [errorModal, toggleErrorModal] = useToggle(false);

    const deletePin = async (id) => {
        const userConfirmed = window.confirm(
            "Are you sure you want to delete this pin?"
        );
        if (userConfirmed) {
            try {
                const response = await axios.delete(`/api/map-pins/${id}`);
                console.log(
                    `Pin ${id} was deleted from the database`,
                    response.data
                );
                toggleSuccessModal(!successModal);
            } catch (error) {
                console.error(
                    "No record with this ID exists in the Database",
                    error
                );
                toggleErrorModal(!errorModal);
            }
        } else {
            console.log("deletion aborted");
            toggleErrorModal(!errorModal);
        }
    };
    useEffect(() => {
        deletePin(details.id);
    }, []);

    return (
        <>
            {successModal && <div>Pin number {details.id} was delted</div>}
            {errorModal && <div>There was an error, please try again</div>}
        </>
    );
}
