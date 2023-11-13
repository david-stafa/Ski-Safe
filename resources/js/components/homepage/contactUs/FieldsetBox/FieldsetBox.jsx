import React from "react";

export default function FieldsetBox({ type, setType, typeNames }) {
    return (
        <fieldset>
            <legend>Contact Info</legend>
            <label htmlFor="type">Category</label>
            <select
                required
                id="type"
                name="type"
                value={type}
                onChange={(event) => {
                    setType(event.target.value);
                }}
            >
                <option value="">— Select Type —</option>
                <optgroup label="Types">
                    {typeNames.map(([id, label]) => {
                        return (
                            <option value={id} key={id}>
                                {label}
                            </option>
                        );
                    })}
                </optgroup>
            </select>
        </fieldset>
    );
}
