import { X as Close } from "react-feather";

export default function Severity({ onClose }) {
    return (
        <>
            <button onClick={onClose} className="close-button">
                <Close />
            </button>
            <h1>Severity</h1>
        </>
    );
}
