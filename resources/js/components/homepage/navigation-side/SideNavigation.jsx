import "./sideNavigation.scss";
import { useState, useRef } from "react";
import { AlertTriangle, Search, Sliders, Calendar } from "react-feather";

export default function SideNavigation({
    onItemSelect,
    setNavExpanded,
    navExpanded,
    showEventPage,
    setShowEventPage,
}) {
    const [navClosed, setNavClosed] = useState(true);

    const hoverRef = useRef();

    const handleEventClick = () => {
        console.log("Event link clicked");
        setShowEventPage(!showEventPage);
    };
    const handleMouseEnter = () => {
        hoverRef.current = setTimeout(() => {
            setNavExpanded(true);
            setNavClosed(false);
        }, 2000);
    };

    const handleMouseLeave = () => {
        clearTimeout(hoverRef.current);
        setNavExpanded(false);
        setNavClosed(true);
    };

    return (
        <nav
            className={
                "sidenav" +
                (navClosed ? " sidenav_closed" : "") +
                (navExpanded ? " sidenav_expanded" : "")
            }
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="sidenav__content">
                <img
                    src="/images/Logo/logo.jpeg"
                    alt="Logo"
                    className="sidenav__logo"
                />

                <div
                    className="sidenav__link"
                    onClick={() => onItemSelect("search")}
                >
                    <Search size={24} />
                    <span>Search</span>
                </div>

                <div
                    className="sidenav__link"
                    onClick={() => onItemSelect("severity")}
                >
                    <AlertTriangle size={24} />
                    <span>Severity</span>
                </div>

                <div
                    className="sidenav__link"
                    onClick={() => onItemSelect("filters")}
                >
                    <Sliders size={24} />
                    <span>Filters</span>
                </div>
                <div className="sidenav__link" onClick={handleEventClick}>
                    <Calendar size={24} />
                    <span>Events</span>
                </div>
            </div>
        </nav>
    );
}
