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
import EditUpload from "../Uploading/EditUpload";
import ProfilePictures from "../admin/ProfilePictures";
import CheckMessages from "../admin/CheckMessages";
import Archive from "../admin/Archive";
import Forum from "./forum/Forum";
import ThreadDetail from "./forum/ThreadDetail";
import UsersData from "../admin/UsersData";
import Event from "../events/Event";

export default function Homepage() {
    return (
        <div className="homepage">
            <Navigation />
            <main style={{ paddingTop: "60px" }}>
                <Routes>
                    <Route path="/" element={<MainContent />}></Route>
                    <Route path="/about-us" element={<AboutUs />}></Route>
                    <Route path="/contact-us" element={<ContactUs />}></Route>

                    <Route path="/forum" element={<Forum />}></Route>

                    <Route
                        path="forum/thread/:id"
                        element={<ThreadDetail />}
                    ></Route>

                    <Route path="/register" element={<Register />}></Route>
                    <Route path="/log-in" element={<Login />}></Route>
                    <Route path="/profile" element={<UserProfile />}></Route>
                    <Route path="/admin" element={<Admin />}></Route>

                    <Route
                        path="/profilepictures"
                        element={<ProfilePictures />}
                    ></Route>
                    <Route
                        path={"/contactusmessages"}
                        element={<CheckMessages />}
                    ></Route>

                    <Route
                        path="/editupload/:id/edit"
                        element={<EditUpload />}
                    ></Route>
                    <Route
                        path={"/contact/archive"}
                        element={<Archive />}
                    ></Route>

                    <Route path="/events/admin" element={<Event />}></Route>
                </Routes>
            </main>

            <Footer />
        </div>
    );
}
