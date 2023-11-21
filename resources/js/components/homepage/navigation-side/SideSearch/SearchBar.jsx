import { useEffect, useState } from "react";
import { X as Close } from "react-feather";
import _ from "lodash";

import "./SearchBar.scss";
import axios from "axios";

export default function SearchBar({ onClose }) {
    const [searchTerm, setSearchTerm] = useState("");

    const debouncedSearch = _.debounce(async (query) => {
        try {
            const response = await axios.get("api/search-pins", {
                params: { text: query },
            });
            console.log("Search results:", response.data);
        } catch (error) {
            console.error("Error during search:", error);
        }
    }, 500);

    useEffect(() => {
        if (searchTerm) {
            debouncedSearch(searchTerm);
        }
    }, [searchTerm]);

    const handleSearchChange = (ev) => {
        setSearchTerm(ev.target.value);
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
            </div>
        </div>
    );
}
