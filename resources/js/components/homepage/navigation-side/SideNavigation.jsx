import { Link } from "react-router-dom";
import "./sideNavigation.scss";
import { useState, useRef } from "react";
import { AlertTriangle, Search, Sliders } from "react-feather";

export default function SideNavigation() {
    const [navClosed, setNavClosed] = useState(true);
    const [navExpanded, setNavExpanded] = useState(false);
    const hoverRef = useRef();

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
                    src="/images/Logo/logo.png"
                    alt="Logo"
                    className="sidenav__logo"
                />

                <Link to={"/"} className="sidenav__link" aria-label="Search">
                    <Search size={24} />
                    <span>Search</span>
                </Link>
                <Link to={"/"} className="sidenav__link" aria-label="Severity">
                    <AlertTriangle size={24} />
                    <span>Severity</span>
                </Link>
                <Link to={"/"} className="sidenav__link" aria-label="Filters">
                    <Sliders size={24} />
                    <span>Filters</span>
                </Link>
            </div>
        </nav>
    );
}
