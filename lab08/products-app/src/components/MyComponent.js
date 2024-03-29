/*
Name: lab8_exe_C.js
Assignment: Lab 8, Exercise C
Author(s): Afsana AxiosHeaders, Al Malik Mahdivika
Submission: March 13, 2024
Description: React.
*/

import React, { useState } from "react";
import ConfirmModal from "./ConfirmModal"; // Adjust the import path as necessary

const YourComponent = () => {
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const handleDelete = () => {
        // Logic to delete the item goes here
        setShowConfirmModal(false); // Close modal after confirmation
    };

    return (
        <>
            <button onClick={() => setShowConfirmModal(true)}>
                Delete Item
            </button>
            <ConfirmModal
                show={showConfirmModal}
                onClose={() => setShowConfirmModal(false)}
                onConfirm={handleDelete}
                title="Confirm Delete"
            >
                Are you sure you want to delete this item?
            </ConfirmModal>
        </>
    );
};

export default YourComponent;
