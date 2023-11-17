import { useState } from "react";
import { X as Close } from "react-feather";

import "./Filters.scss";

export default function Filters({ onClose }) {
    const [filterOne, setFilterOne] = useState(false);
    const [filterTwo, setFilterTwo] = useState(false);

    return (
        <div className="filters-container">
            <div className="filters-header">
                <h4>Filters</h4>
                <button onClick={onClose} className="close-button">
                    <Close />
                </button>
            </div>

            <div className="filter-option">
                <label>
                    <input
                        type="checkbox"
                        checked={filterOne}
                        onChange={() => setFilterOne(!filterOne)}
                    />
                    <span className="slider"></span>
                </label>
                <p>Change Joe</p>
            </div>

            <div className="filter-option">
                <label>
                    <input
                        type="checkbox"
                        checked={filterTwo}
                        onChange={() => setFilterTwo(!filterTwo)}
                    />
                    <span className="slider"></span>
                </label>
                <p>Lifts</p>
            </div>
        </div>
    );
}
