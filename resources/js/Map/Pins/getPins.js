import axios from "axios";

export const getPins = async () => {
    const response = await axios.get("/api/map-pins");
    const data = response.data;
    // console.log(data);

    const pins = data.map((item, index) => ({
        key: index,
        type: "Feature",
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
    console.log(pins);
};
