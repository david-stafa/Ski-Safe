import "./homepage.scss";
import Footer from "./footer/Footer";
import MainContent from "./mainContent/MainContent";
import Navigation from "./navigation/Navigation";
import AboutUs from "./aboutUs/AboutUs";
import ContactUs from "./contactUs/ContactUs";
import Register from "./register/Register";
import Login from "./login/Login";
import { Route, Routes } from "react-router-dom";
import Map from "../../Map/Map";

export default function Homepage() {
    return (
        <>
            <Navigation />
            <Routes>
                <Route path="/" element={<MainContent />}></Route>
                <Route path="/about-us" element={<AboutUs />}></Route>
                <Route path="/contact-us" element={<ContactUs />}></Route>
                <Route path="/register" element={<Register />}></Route>
                <Route path="/log-in" element={<Login />}></Route>
            </Routes>

            <Map />

            <Footer />
        </>
    );
}
