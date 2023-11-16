import mapboxgl from "mapbox-gl";
import axios from "axios";
import './addPinOnMap.scss'

// modal 1/4
import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import Modal from "../../../components/Modal/Modal";


const MyFormModalContent = ({lng, lat}) => {

    const [formData, setFormData] = React.useState({
        title: "",
        description: "",
        latitude: lat,
        longitude: lng,
        severity_id: 1,
        slug: "",
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
            
            <div className="input-group">
                <label htmlFor="title">Title</label>
                <input
                    id="title"
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="input-field"
                />
            </div>

            
           <div className="input-group"> 
                <label htmlFor="slug">Slug</label>
                <input type="text" name="slug" id="slug" value={formData.slug} onChange={handleChange} className="input-field"/>
           </div>

            <div className="input-group">
                <label htmlFor="description">Description</label>
                <textarea
                    name="description"
                    id="description"
                    value={formData.description}
                    onChange={handleChange}
                />
            </div>

            <div className="input-group">
                <label htmlFor="severity_id">Severity state</label>
                <select name="severity_id" id="severity_id" value={formData.severity_id || ''} onChange={handleChange} className="input-field">
                    <option value="1">Low</option>
                    <option value="2">Moderate</option>
                    <option value="3">High</option>
                </select>
            </div>


            <button type="submit" className="submit-button">Submit</button>
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
    map.on("dblclick", (event) => {
        const popup = new mapboxgl.Popup().setHTML(
            `
                <div class="pop-up">
                    <h3>[${event.lngLat.lng.toFixed(6)}, ${event.lngLat.lat.toFixed(6)}]</h4>
                    <button id="create-form-button">Create a pin</button>
                </div>
            `
        );

    // modal 4/4
        setTimeout(() => {
            document
                .getElementById("create-form-button")
                .addEventListener("click", () => {
                    handleToggleModal(
                        <div className="register-container">
                            <div className="register-header">
                                <h2>
                                    Create a pin.
                                </h2>
                            </div>

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
