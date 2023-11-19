import { useEffect, useState } from "react";

export default function PopUpContent({
    isModalOpen,
    toggleIsModalOpen,
    details,
}) {
    const handleClick = () => {
        toggleIsModalOpen(!isModalOpen);
        console.log(details);
    };

    return (
        <>
            {details.title && <h1>{details.title}</h1>}
            <button className="more-details-button" onClick={handleClick}>
                MoreDetails
            </button>
        </>
    );
}

//             <h3 className="pop-up__title">{details.title}</h3>
//             <p className="pop-up__slug">{details.slug}</p>
//             <p className="pop-up__severity">
//                 Severity:{details.severity}
//             </p>
//             <button className="more-details-button" onClick={handleClick}>
//                 MoreDetails
//             </button> )
//             :

//     );
// }
