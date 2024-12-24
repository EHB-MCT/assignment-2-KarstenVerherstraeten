import React, { useEffect, useRef, useState } from "react";

function DataManager() {
    const hasFetched = useRef(false);
    const [displayData, setDisplayData] = useState([]); // Store data to display

    useEffect(() => {
        if (!hasFetched.current) {
            hasFetched.current = true;
            fetch("http://localhost:3000/traffic-data")
                .then((response) => response.json())
                .then((data) => {
                    const filteredData = data.filter(
                        (item) => !item.category.toLowerCase().includes("onbekend") // Filter out missing data
                    );
                    setDisplayData(filteredData); // Set filtered data to displayData
                });
        }
    }, []);


   
    return (
        <>
            <div className="category">
                {displayData.map((item, index) => (
                    <div key={index}>
                        <h2>{item.category}</h2>
                        <p>Year: {item.year}</p>
                        <p>Value: {item.value}</p>
                    </div>
                ))}
            </div>
        </>
    );
}
