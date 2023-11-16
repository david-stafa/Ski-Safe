import { Route, Routes } from "react-router-dom";
import Map from "../../../Map/Map";
import SideNavigation from "../navigation-side/SideNavigation";

export default function MainContent() {
    return (
        <>
            <Map />
            <SideNavigation />
        </>
    );
}
