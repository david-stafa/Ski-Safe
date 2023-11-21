import "./AdjacentRectangle.scss";
import Filters from "./SideFilters/Filters";
import Severity from "./SideSeverity/Severity";
import SearchBar from "./SideSearch/SearchBar";

export default function AdjacentRectangle({
    activeItem,
    onClose,
    navExpanded,
    filterHazards,
    setFilterHazards,
    filterLifts,
    setFilterLifts,
    onSearch,
    onClearSearch,
}) {
    const leftPosition = navExpanded ? "372px" : "292px";
    return (
        <div className="adjacent-rectangle" style={{ left: leftPosition }}>
            {activeItem === "search" && (
                <SearchBar
                    onClose={onClose}
                    onSearch={onSearch}
                    onClearSearch={onClearSearch}
                />
            )}
            {activeItem === "severity" && <Severity onClose={onClose} />}
            {activeItem === "filters" && (
                <Filters
                    onClose={onClose}
                    filterHazards={filterHazards}
                    setFilterHazards={setFilterHazards}
                    filterLifts={filterLifts}
                    setFilterLifts={setFilterLifts}
                />
            )}
        </div>
    );
}
