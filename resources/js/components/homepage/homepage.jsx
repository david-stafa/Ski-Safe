import "./homepage.scss";
import Footer from "./footer/Footer";
import MainContent from "./mainContent/MainContent";
import Navigation from "./navigation/Navigation";
import AboutUs from "./aboutUs/AboutUs";
import ContactUs from "./contactUs/ContactUs";
import { Route, Routes } from "react-router-dom";
import Map from "../../Map/Map";
import SideNavigation from "./navigation-side/SideNavigation";

export default function Homepage() {
    return (
        <>
            <Navigation />

            {/* <SideNavigation /> */}

            <Routes>
                <Route path="/" element={<MainContent />}></Route>
                <Route path="/about-us" element={<AboutUs />}></Route>
                <Route path="/contact-us" element={<ContactUs />}></Route>
            </Routes>

            <Map />

            <Footer />
        </>
    );
}
