import React, { useState } from "react";
import { Search } from "react-feather";
import "./SearchBar.scss";

export default function SearchBar({ isExpanded, onExpand }) {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div
            className={`search-bar ${isExpanded ? "expanded" : ""}`}
            onClick={onExpand}
        >
            <Search size={24} />
            {isExpanded && (
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="search-bar__input"
                />
            )}
        </div>
    );
}
