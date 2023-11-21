export default function cursorStyle(map) {
    // syle the mouse as user enters points
    map.on("mouseenter", "pois", () => {
        map.getCanvas().style.cursor = "pointer";
    });

    // remove mouse style as user leaves
    map.on("mouseleave", "pois", () => {
        map.getCanvas().style.cursor = "";
    });

    map.on("mouseenter", "points", () => {
        map.getCanvas().style.cursor = "pointer";
    });

    // remove mouse style as user leaves
    map.on("mouseleave", "points", () => {
        map.getCanvas().style.cursor = "";
    });

    // syle the mouse as user enters points
    map.on("mouseenter", "lifts", () => {
        map.getCanvas().style.cursor = "pointer";
    });

    // remove mouse style as user leaves
    map.on("mouseleave", "lifts", () => {
        map.getCanvas().style.cursor = "";
    });
}
