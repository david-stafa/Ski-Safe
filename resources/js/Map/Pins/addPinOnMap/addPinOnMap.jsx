import mapboxgl from "mapbox-gl";
import "./addPinOnMap.scss";
import { MyFormModalContent } from "./MyFormModalContent";
import AddPinContent from "./AddPinContent";
import React, { useEffect, useState, useCallback, useContext } from "react";
import { createRoot } from "react-dom/client";
import useToggle from "../../../components/Modal/use-toggle";

export default function AddPinOnMap({ map, user }) {
    const [isMyFormModalOpen, toggleIsMyFormModalOpen] = useToggle(false);
    const [coordinates, setCoordinates] = useState([]);
    let markerOnMap = false;

    const marker = new mapboxgl.Marker({
        color: "#314ccd",
    });

    //on click function
    const handleDblClick = useCallback(
        (e) => {
            const newCoordinates = [
                e.lngLat.lng.toFixed(6),
                e.lngLat.lat.toFixed(6),
            ];

            setCoordinates(newCoordinates);

            const placeHolder = document.createElement("div");
            placeHolder.className = "pop-up";
            const popUpRoot = createRoot(placeHolder);
            popUpRoot.render(
                <AddPinContent
                    user={user}
                    isMyFormModalOpen={isMyFormModalOpen}
                    toggleIsMyFormModalOpen={toggleIsMyFormModalOpen}
                    coordinates={newCoordinates}
                />
            );

            const popup = new mapboxgl.Popup({
                closeButton: false,
                closeOnClick: true,
            })
                .setDOMContent(placeHolder)
                .setLngLat([e.lngLat.lng.toFixed(6), e.lngLat.lat.toFixed(6)])
                .addTo(map);

            setTimeout(() => {
                if (!markerOnMap) {
                    popup.addTo(map);
                }
            }, 500);
        },
        [map, coordinates]
    );

    useEffect(() => {
        map.on("dblclick", handleDblClick);
        return () => {
            map.off("dblclick", handleDblClick);
        };
    }, [map, coordinates, handleDblClick]);

    return (
        <>
            {isMyFormModalOpen && (
                <MyFormModalContent
                    coordinates={coordinates}
                    marker={marker}
                    markerOnMap={markerOnMap}
                    map={map}
                    toggleIsMyFormModalOpen={toggleIsMyFormModalOpen}
                />
            )}
        </>
    );
}
