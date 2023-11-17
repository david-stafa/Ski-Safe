import { useEffect, useState } from "react";
import { X as Close } from "react-feather";

import "./Severity.scss";

export default function Severity({ onClose }) {
    const [severityValue, setSeverityValue] = useState(3);
    const [isToggleOn, setIsToggleOn] = useState(false);

    useEffect(() => {
        const savedSeverity = localStorage.getItem("severity");
        if (savedSeverity) {
            setSeverityValue(parseInt(savedSeverity, 10));
        }
    }, []);

    useEffect(() => {
        if (isToggleOn) {
            localStorage.setItem("severity", severityValue);
        }
    }, [severityValue, isToggleOn]);

    const handleSeverityChange = (event) => {
        setSeverityValue(parseInt(event.target.value, 10));
    };

    const handleToggleChange = () => {
        setIsToggleOn(!isToggleOn);
    };

    const severityLevel =
        severityValue === 1 ? "low" : severityValue === 2 ? "moderate" : "high";

    console.log(severityValue);

    return (
        <div className="severity-container">
            <div className="severity-header">
                <h4>Severity</h4>
                <button onClick={onClose} className="close-button">
                    <Close />
                </button>
            </div>

            <div className="filter-option-severity">
                <label>
                    <input
                        type="checkbox"
                        checked={isToggleOn}
                        onChange={handleToggleChange}
                    />
                    <span className="slider"></span>
                </label>
                <span className="toggle-label">Options</span>
            </div>

            {isToggleOn && (
                <>
                    <div className="severity-labels">
                        <span>Low</span>
                        <span>Moderate</span>
                        <span>High</span>
                    </div>

                    <div className={`severity-slider slider-${severityLevel}`}>
                        <input
                            type="range"
                            min="1"
                            max="3"
                            value={severityValue}
                            onChange={handleSeverityChange}
                        />
                    </div>
                </>
            )}
        </div>
    );
}
