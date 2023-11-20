import { useState } from "react";
import { X as Close } from "react-feather";

import "./Filters.scss";

export default function Filters({
    onClose,
    filterHazards,
    setFilterHazards,
    filterLifts,
    setFilterLifts,
}) {
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
                        checked={filterHazards}
                        onChange={() => setFilterHazards(!filterHazards)}
                    />
                    <span className="slider"></span>
                </label>
                <p>Hazards</p>
            </div>

            <div className="filter-option">
                <label>
                    <input
                        type="checkbox"
                        checked={filterLifts}
                        onChange={() => setFilterLifts(!filterLifts)}
                    />
                    <span className="slider"></span>
                </label>
                <p>Lifts</p>
            </div>
        </div>
    );
}
