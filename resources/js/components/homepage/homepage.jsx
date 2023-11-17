import "./homepage.scss";
import Footer from "./footer/Footer";
import MainContent from "./mainContent/MainContent";
import Navigation from "./navigation/Navigation";
import AboutUs from "./aboutUs/AboutUs";
import ContactUs from "./contactUs/ContactUs";
import Register from "./register/Register";
import UserProfile from "../profile/UserProfile";
import Login from "./login/Login";
import Admin from "../admin/Admin";
import { Route, Routes } from "react-router-dom";

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
                <Route path="/profile" element={<UserProfile />}></Route>
                <Route path="/admin" element={<Admin />}></Route>
            </Routes>

            <Footer />
        </>
    );
}
