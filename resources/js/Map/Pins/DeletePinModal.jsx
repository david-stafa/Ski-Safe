import axios from "axios";
import React, { useEffect } from "react";
import useToggle from "../../components/Modal/use-toggle";
import loadLayers from "./addPinOnMap/loadLayers";
import Modal from "../../components/Modal/Modal";

export default function DeletePinModal({ details, map }) {
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
                loadLayers(map);
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
            {successModal && (
                <Modal handleDismiss={toggleSuccessModal}>
                    <p>Pin number: {details.id} was succesfully deleted</p>
                </Modal>
            )}
            {errorModal && (
                <Modal handleDismiss={toggleErrorModal}>
                    <p>There was an error locating Pin number: {details.id}.</p>
                    <br />
                    <p>Please Try again</p>
                </Modal>
            )}
        </>
    );
}
