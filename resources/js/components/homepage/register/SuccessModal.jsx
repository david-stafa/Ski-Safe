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
                        src="https://player.vimeo.com/external/219330771.sd.mp4?s=fd5e5f1cca0c55c06d20b844f135e9d7b53b200a&profile_id=164&oauth2_token_id=57447761"
                        type="video/mp4"
                    />
                </video>
            </div>
        </Modal>
    );
};

export default SuccessModal;
