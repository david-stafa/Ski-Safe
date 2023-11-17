import { X as Close } from "react-feather";

export default function Filters({ onClose }) {
    return (
        <>
            <button onClick={onClose} className="close-button">
                <Close />
            </button>
            <h1>Filters</h1>
        </>
    );
}
