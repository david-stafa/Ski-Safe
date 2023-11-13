import { Link } from "react-router-dom";
import "./sideNavigation.scss";
import { useState } from "react";

export default function SideNavigation() {
    const [navClosed, setNavClosed]=useState(false)

    return (
        <>
            <nav className={"sidenav" + (navClosed ? " sidenav_closed" : "")}>
                
                <div className="sidenav__content">
                    <img
                        src="/images/Logo/logo.png"
                        alt="logo ski safe"
                        className="sidenav__image"
                    />
                    <div className="sidenav__links">
                        <Link to={"/"} className="sidenav__link">Home</Link>
                        <Link to={"/about-us"} className="sidenav__link">About us</Link>
                        <Link to={"/contact-us"} className="sidenav__link">Contact us</Link>
                    </div>
                </div>
                <span className={"sidenav__arrow" + (navClosed ? " sidenav__arrow_closed" : "")} onClick={()=>setNavClosed(!navClosed)}></span>
            </nav>
        </>
    );
}

