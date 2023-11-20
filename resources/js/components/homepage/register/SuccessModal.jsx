import React from "react";
import Modal from "react-modal";
import "./successModal.scss";
import { VideoOff } from "react-feather";

const SuccessModal = ({ isOpen, onRequestClose }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Welcome Modal"
            className="custom-modal"
            overlayClassName="overlay"
        >
            <div className="modal">
                <div className="text-content">
                    <h2 className="welcome-message">Welcome to SkiSafe!</h2>
                    <p className="modal-message">
                        You will be redirected to the homepage in a few seconds
                    </p>
                </div>
                <video autoPlay loop muted className="video-background">
                    <source
                        src="https://static.videezy.com/system/resources/previews/000/004/927/original/Snowflakes_Falling_Motion_Background_4K.mp4"
                        type="video/mp4"
                    />
                </video>
            </div>
        </Modal>
    );
};

export default SuccessModal;
