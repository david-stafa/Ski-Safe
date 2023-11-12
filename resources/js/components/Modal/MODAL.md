# Modal Component

## Description

This Modal Component is a lightweight, flexible, and customizable React component designed for displaying content in a layer above your application's main content. It's perfect for confirmation messages, quick forms, or any other content that needs to stand out from the main flow. Biggest usage will be with particular pins on the map. Maybe the overlay and position will have to be then adjusted. [Example](https://i0.wp.com/codemyui.com/wp-content/uploads/2017/05/simple-button-to-popup-modal-window.gif?fit=880%2C440&ssl=1)

## Files

TestModal.jsx - Parent Element where Modal component is used  
Modal.jsx - Modal component itself  
Modal.css - styles  
use-toggle.js - helping function for usage of toggle

## How to use it?

### Installation

Please install those packages:

```bash
npm i react-feather
npm i react-focus-lock
npm i react-remove-scroll
```

### Usage

Use component as any other React component. Component is reusable. This means you have to pass all the props from parent.
Nevertheless please follow steps below for correct user and dev experience.

#### Parent component

```bash
import useToggle from "./use-toggle";
import Modal from "./Modal";
```

Function specifications

```bash
const [isModalOpen, toggleIsModalOpen] = useToggle(false);
```

Return

```bash
        <>
            {isModalOpen && (
                <Modal handleDismiss={toggleIsModalOpen}>
                    This is the modal window, you can put everything you want in
                    here!
                </Modal>
            )}
            <button onClick={toggleIsModalOpen}>Name of the button</button>
        </>
```
