import React from "react";

import useToggle from "./use-toggle";
import Modal from "./Modal";

export default function TestModal() {
    const [isModalOpen, toggleIsModalOpen] = useToggle(false);
    return (
        <>
            {isModalOpen && (
                <Modal handleDismiss={toggleIsModalOpen}>
                    This is the modal window, you can put everything you want in
                    here!
                    <p>It can be closed by X or by hitting overlay.</p>
                    <img
                        className="image"
                        src="/images/Modal/Modal.png"
                        alt="modal"
                    />
                </Modal>
            )}
            <button onClick={toggleIsModalOpen}>You can try this MODAL!</button>
        </>
    );
}
