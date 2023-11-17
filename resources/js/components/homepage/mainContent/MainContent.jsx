import Map from "../../../Map/Map";
import SideNavigation from "../navigation-side/SideNavigation";
import { useState } from "react";
import AdjacentRectangle from "../navigation-side/AdjacentRectangle";

export default function MainContent() {

    const [activeItem, setActiveItem] = useState(null);
    const [navExpanded, setNavExpanded] = useState(false);

    const handleItemSelect = (item) => {
        setActiveItem((prevItem) => (prevItem === item ? null : item));
    };

    const handleClose = () => {
        setActiveItem(null);
    };

    return (
        <>
            <div className="main-content">
                <Map />
                <SideNavigation
                    onItemSelect={handleItemSelect}
                    setNavExpanded={setNavExpanded}
                    navExpanded={navExpanded}
                />
                {activeItem && (
                    <AdjacentRectangle
                        activeItem={activeItem}
                        onClose={handleClose}
                        navExpanded={navExpanded}
                    />
                )}
            </div>
        </>
    );

}
