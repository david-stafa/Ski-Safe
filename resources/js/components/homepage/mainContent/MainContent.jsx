import Map from "../../../Map/Map";
import SideNavigation from "../navigation-side/SideNavigation";
import { useState } from "react";
import AdjacentRectangle from "../navigation-side/AdjacentRectangle";
import Weather from "../weather/Weather";

export default function MainContent() {
    const [activeItem, setActiveItem] = useState(null);
    const [navExpanded, setNavExpanded] = useState(false);

    const handleItemSelect = (item) => {
        setActiveItem((prevItem) => (prevItem === item ? null : item));
    };

    const handleClose = () => {
        setActiveItem(null);
    };

    // Filters below
    const [filterHazards, setFilterHazards] = useState(true);
    const [filterLifts, setFilterLifts] = useState(true);
    const [filterPois, setFilterPois] = useState(true);
    // Filters above

    // Search below
    const [searchResults, setSearchResults] = useState([]);
    const handleSearchResults = (results) => {
        setSearchResults(results);
    };

    const handleClearSearch = () => {
        setSearchResults([]);
    };
    //Search above

    return (
        <>
            <div className="main-content">
                <Map
                    filterHazards={filterHazards}
                    filterLifts={filterLifts}
                    filterPois={filterPois}
                    searchResults={searchResults}
                />
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
                        filterHazards={filterHazards}
                        setFilterHazards={setFilterHazards}
                        filterLifts={filterLifts}
                        setFilterLifts={setFilterLifts}
                        filterPois={filterPois}
                        setFilterPois={setFilterPois}
                        onSearch={handleSearchResults}
                        onClearSearch={handleClearSearch}
                    />
                )}
                {/* <Weather /> */}
            </div>
        </>
    );
}
