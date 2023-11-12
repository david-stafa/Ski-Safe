import { Link } from "react-router-dom";
import "./navigation.scss";

export default function Navigation() {
    return (
        <>
            <div className="left-panel-container">
                {/* Add our LOGO */}
                <img
                    className="logo"
                    src="/images/Logo/logo.png"
                    alt="logo ski safe"
                />
                <div className="nav">
                    <Link to={"/"}>Home</Link>
                    <Link to={"/about-us"}>About us</Link>
                    <Link to={"/contact-us"}>Contact us</Link>
                </div>
                <span className="sidenav__arrow"></span>
            </div>
        </>
    );
}
