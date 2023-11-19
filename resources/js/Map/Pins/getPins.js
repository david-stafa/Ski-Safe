import axios from "axios";

export const getPins = async () => {
    try {
        const response = await axios.get("/api/map-pins");
        const data = response.data;

        const pins = data.map((item) => ({
            type: "Feature",
            geometry: {
                type: "Point",
                // coordinates [Longitude,Latitude]
                coordinates: [item.longitude, item.latitude],
            },
            properties: {
                id: item.id,
                title: item.title,
                severity: item.severity.name,
                slug: item.slug,
                description: item.description,
                type_id: item.type_id,
                creator_id: item.creator_id,
                video: item.video,
                images: item.images,
                active: item.active,
            },
        }));

        return pins;
    } catch (error) {
        console.error("Error fetching pins:", error);
        return [];
    }
};
