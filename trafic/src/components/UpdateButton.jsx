import React, { useState } from "react";
import style from "../modules/button.module.css";

function UpdateButton() {
    const [responseMessage, setResponseMessage] = useState(null); // State to store the success response
    const [errorMessage, setErrorMessage] = useState(null); // State to store errors

    const handleClick = async () => {
        setResponseMessage(null); // Reset messages
        setErrorMessage(null);

        try {
            const response = await fetch("http://localhost:3000/traffic-data/bulk", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const data = await response.json(); // Parse the success response
                setResponseMessage(data); // Update the success state
            } else {
                const errorData = await response.json(); // Parse the error response
                setErrorMessage(errorData.error || "Failed to update data.");
            }
        } catch (error) {
            console.error("Error updating data:", error);
            setErrorMessage("An error occurred while updating the data.");
        }
    };

    return (
        <div className="UpdateButton">
            <button id="update" className={style.button} onClick={handleClick}>
                Update
            </button>

            {/* Success Message */}
            {responseMessage && (
                <div className={style.response}>
                    <p>{responseMessage.message}</p>
                    <ul>
                        <li><strong>Matched Count:</strong> {responseMessage.matchedCount}</li>
                        <li><strong>Modified Count:</strong> {responseMessage.modifiedCount}</li>
                        <li><strong>Upserted Count:</strong> {responseMessage.upsertedCount}</li>
                    </ul>
                </div>
            )}

            {/* Error Message */}
            {errorMessage && (
                <div className={style.response}>
                    <p>{errorMessage}</p>
                </div>
            )}
        </div>
    );
}

export default UpdateButton;