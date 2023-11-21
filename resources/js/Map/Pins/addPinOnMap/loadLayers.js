import { addHazardLayer } from "../addHazardLayer";
import { addLiftLayer } from "../addLiftLayer";
import { addPoiLayer } from "../addPoiLayer";

export default function loadLayers(map) {
    addHazardLayer(map);
    addLiftLayer(map);
    addPoiLayer(map);
    return;
}
