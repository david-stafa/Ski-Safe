import React from "react";
import Modal from "react-modal";
import "./successModal.scss";

const SuccessModal = ({ isOpen, onRequestClose }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Welcome Modal"
            className="custom-modal"
            overlayClassName="custom-overlay"
        >
            <div className="modal">
                <h2 className="welcome-message">Welcome to SkiSafe!</h2>
                <p className="modal-message">
                    You will be redirected to the homepage in a few seconds
                </p>
            </div>
        </Modal>
    );
};

export default SuccessModal;
