import "./AdjacentRectangle.scss";
import Filters from "./SideFilters/Filters";
import Severity from "./SideSeverity/Severity";
import SearchBar from "./SideSearch/SearchBar";

export default function AdjacentRectangle({
    activeItem,
    onClose,
    navExpanded,
}) {
    const leftPosition = navExpanded ? "372px" : "292px";
    return (
        <div className="adjacent-rectangle" style={{ left: leftPosition }}>
            {activeItem === "search" && <SearchBar onClose={onClose} />}
            {activeItem === "severity" && <Severity onClose={onClose} />}
            {activeItem === "filters" && <Filters onClose={onClose} />}
        </div>
    );
}
