import { useEffect, useState } from "react";
import { X as Close } from "react-feather";
import _ from "lodash";

import "./SearchBar.scss";
import axios from "axios";

export default function SearchBar({ onClose, onSearch, onClearSearch }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResultsCount, setSearchResultsCount] = useState(0);

    const debouncedSearch = _.debounce(async (query) => {
        try {
            const response = await axios.get("api/search-pins", {
                params: { text: query },
            });
            //console.log("Search results:", response.data);
            onSearch(response.data); // new stuff
            setSearchResultsCount(response.data.length);
        } catch (error) {
            console.error("Error during search:", error);
            onSearch([]); //new stuff
            setSearchResultsCount(0);
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

    const handleClearSearch = () => {
        setSearchTerm("");
        onClearSearch();
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
            {searchTerm && (
                <>
                    <div className="search-results-count">
                        {searchResultsCount === 0 &&
                            "Sorry, mate. There are no pins on the map."}
                        {searchResultsCount === 1 &&
                            "There is 1 pin on the map."}
                        {searchResultsCount > 1 &&
                            `There are ${searchResultsCount} pins on the map.`}
                    </div>

                    <button onClick={handleClearSearch}>Reset</button>
                </>
            )}
        </div>
    );
}
