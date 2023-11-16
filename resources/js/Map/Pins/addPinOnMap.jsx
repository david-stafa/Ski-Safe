import mapboxgl from "mapbox-gl";
import axios from "axios";

// modal 1/4
import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import Modal from "../../components/Modal/Modal";


const MyFormModalContent = ({lng, lat}) => {

    const [formData, setFormData] = React.useState({
        title: "",
        description: "",
        latitude: lat,
        longitude: lng,
        severity_id: 1,
        slug:'David sucks',
        active: true
    });

    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        console.log(formData)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/api/pin/store", formData);
            console.log('Your pin was successfully created', response)
        } catch (error) {console.error('Error:', error.response.data)}
    };
    
    return (
        <form action="" onSubmit={handleSubmit}>
            <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
            />
            <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
            />

            <input type="hidden" name="longitude" id="longitude" value={lng} />
            <input type="hidden" name="latitude" id="latitude" value={lat} />

            <button type="submit">Submit</button>
        </form>
    );
};
export const pinOnMap = (map) => {

    // modal 2/4
    const handleToggleModal = (content) => {
     
    const modalRoot = document.createElement("div");
    document.body.appendChild(modalRoot);

    const root = createRoot(modalRoot);

    const handleDismiss = () => {
        root.unmount();
        modalRoot.remove();
    };

    root.render(<Modal handleDismiss={handleDismiss} >{content}</Modal>);
    };


    let markerOnMap = false;
    //Look of the marker
    const marker = new mapboxgl.Marker({
        color: "#314ccd",
    });

    //on click function
    map.on("click", (event) => {
        const popup = new mapboxgl.Popup().setHTML(
            `
                <h3>[${event.lngLat.lng.toFixed(6)}, ${event.lngLat.lat.toFixed(6)}]</h4>
                <button id="create-form-button">Create a pin</button>
            `
        );

    // modal 4/4
        setTimeout(() => {
            document
                .getElementById("create-form-button")
                .addEventListener("click", () => {
                    handleToggleModal(
                        <div>
                            <h2 style={{ color: "green" }}>
                                Create a pin.
                            </h2>

                            <MyFormModalContent lng={event.lngLat.lng.toFixed(6)} lat={event.lngLat.lat.toFixed(6)}/>
                        </div>
                    );
                });
        }, 0);

        // Enables to put pin one one click, on second click deletes it
        if (markerOnMap) {  
            marker.remove()
            markerOnMap = false
        } else {
            marker
                .setLngLat([event.lngLat.lng, event.lngLat.lat])
                .setPopup(popup)
                .addTo(map)
                .togglePopup();

            markerOnMap = true;
        }  
    }); 
};
