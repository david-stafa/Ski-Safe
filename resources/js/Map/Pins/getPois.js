import axios from "axios";

export const getPois = async () => {
    try {
        const response = await axios.get("/api/poi-pins");
        const data = response.data;

        const lifts = data.map((item) => ({
            type: "Feature",
            geometry: {
                type: "Point",
                // coordinates [Longitude,Latitude]
                coordinates: [item.longitude, item.latitude],
            },
            properties: {
                id: item.id,
                title: item.title,
                slug: item.slug,
                description: item.description,
                type_id: item.type_id,
                creator_id: item.creator_id,
                video: item.video,
                images: item.images,
                active: item.active,
            },
        }));
        console.log(lifts);
        return lifts;
    } catch (error) {
        console.error("Error fetching pins:", error);
        return [];
    }
};
