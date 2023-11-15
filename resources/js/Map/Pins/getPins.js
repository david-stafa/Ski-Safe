import axios from "axios";

export const getPins = async () => {
    try {
        const response = await axios.get("/api/map-pins");
        const data = response.data;
        console.log(data);

        const pins = data.map((item, index) => ({
            key: index,
            type: "Feature", //changed from feature to feature collection
            geometry: {
                type: "Point",
                // coordinates [Longditude, Latitude]
                coordinates: [item.longditude, item.latitude],
            },
            properties: {
                title: item.title,
                severity: item.severity.name,
                slug: item.slug,
                description: item.description,
                type_id: item.type_id,
                creator_id: item.creator_id,
                video: item.video,
                image: item.images,
                active: item.active,
            },
        }));
        return pins;
    } catch (error) {
        console.error("Error fetching pins:", error);
        return [];
    }
};
