import { useState } from "react";
import { X as Close } from "react-feather";

import "./SearchBar.scss";

export default function SearchBar({ onClose }) {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchChange = (ev) => {
        setSearchTerm(ev.target.value);
    };

    const handleSearch = () => {
        console.log("Searching for:", searchTerm);
        // Axis or ....
        setSearchTerm("");
    };

    return (
        <div className="searchbar-container">
            <div className="searchbar-header">
                <h4>Search</h4>
                <button onClick={onClose} className="close-button">
                    <Close />
                </button>
            </div>
            <div className="search-field">
                <input
                    type="text"
                    placeholder="Search here..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <button onClick={handleSearch} className="search-button">
                    Search
                </button>
            </div>
        </div>
    );
}
