import axios from "axios";

export const deletePin = async (id) => {
    const userConfirmed = window.confirm(
        "Are you sure you want to delete this pin?"
    );
    if (userConfirmed) {
        try {
            const response = await axios.delete(`/api/map-pins/${id}`);
            console.log(
                `Pin ${id} was deleted from the database`,
                response.data
            );
        } catch (error) {
            console.error(
                "No record with this ID exists in the Database",
                error
            );
        }
    } else {
        console.log("deletion aborted");
    }
};
