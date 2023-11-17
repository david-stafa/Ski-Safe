import { X as Close } from "react-feather";

export default function SearchBar({ onClose }) {
    return (
        <>
            <button onClick={onClose} className="close-button">
                <Close />
            </button>
            <h1>Search</h1>
        </>
    );
}
