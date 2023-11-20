import React, { useState, useEffect } from "react";

function ControlPanel(props) {
    const [visibility, setVisibility] = useState({
        lifts: true,
        hazard: true,
    });

    useEffect(() => {
        // Convert true/false to "visible"/"none"
        const visibilityState = Object.fromEntries(
            Object.entries(visibility).map(([k, v]) => [
                k,
                v ? "visible" : "none",
            ])
        );
        props.onChange(visibilityState);
    }, [visibility]);

    const onVisibilityChange = (name, value) => {
        setVisibility({ ...visibility, [name]: value });
    };

    return (
        <div>
            <h3>Layers</h3>
            <label>
                <input
                    type="checkbox"
                    checked={visibility["lifts"]}
                    onChange={(evt) =>
                        onVisibilityChange("lifts", evt.target.checked)
                    }
                />{" "}
                Lifts
            </label>
            <label>
                <input
                    type="checkbox"
                    checked={visibility["hazard"]}
                    onChange={(evt) =>
                        onVisibilityChange("hazard", evt.target.checked)
                    }
                />{" "}
                Hazard
            </label>
        </div>
    );
}

export default React.memo(ControlPanel);

/*

Sure, I can guide you on how to toggle layers on and off in Mapbox GL JS using React. 

You can create a control panel component in React that manages the visibility state of your layers. Here's an example of how you can do it:

```jsx
import React, { useState, useEffect } from 'react';

function ControlPanel(props) {
    const [visibility, setVisibility] = useState({
        lifts: true,
        hazard: true
    });

    useEffect(() => {
        // Convert true/false to "visible"/"none"
        const visibilityState = Object.fromEntries(
            Object.entries(visibility).map(([k, v]) => [k, v ? "visible" : "none"])
        );
        props.onChange(visibilityState);
    }, [visibility]);

    const onVisibilityChange = (name, value) => {
        setVisibility({ ...visibility, [name]: value });
    };

    return(
        <div>
            <h3>Layers</h3>
            <label><input type="checkbox"
                checked={visibility["lifts"]}
                onChange={evt => onVisibilityChange("lifts", evt.target.checked)}
            /> Lifts</label>
            <label><input type="checkbox"
                checked={visibility["hazard"]}
                onChange={evt => onVisibilityChange("hazard", evt.target.checked)}
            /> Hazard</label>
        </div>
    )
}

export default React.memo(ControlPanel);
```

In this example, the `ControlPanel` component maintains a state object `visibility` that tracks the visibility of the 'lifts' and 'hazard' layers. When a checkbox is toggled, the `onVisibilityChange` function updates the `visibility` state. The `useEffect` hook listens for changes in the `visibility` state and calls the `props.onChange` function with the new visibility state.

You can use this `ControlPanel` component in your map component and pass a function that updates the visibility of the layers on the map:

```jsx
<ControlPanel onChange={updateLayerVisibility} />
```

The `updateLayerVisibility` function could look something like this:

```jsx
function updateLayerVisibility(visibility) {
    for (const [layerId, visibility] of Object.entries(visibility)) {
        if (map.getLayer(layerId)) {
            map.setLayoutProperty(layerId, 'visibility', visibility);
        }
    }
}
```

This function iterates over each entry in the `visibility` object and sets the visibility of the corresponding layer on the map.

Please note that this is a simplified example and you might need to adjust it according to your application's needs.

[Source](https://stackoverflow.com/questions/75688118)


*/
