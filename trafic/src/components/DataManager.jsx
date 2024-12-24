import React, { useEffect, useRef, useState } from "react";

export function fetchFilteredData(selectedCategory) {
    return fetch("http://localhost:3000/traffic-data")
        .then((response) => response.json())
        .then((data) => {
            return data.filter((item) => item.category === selectedCategory);
        });
}

function DataManager() {
    const hasFetched = useRef(false);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [displayData, setDisplayData] = useState([]); // Store data to display

    useEffect(() => {
        if (!hasFetched.current) {
            hasFetched.current = true;
            fetch("http://localhost:3000/traffic-data")
                .then((response) => response.json())
                .then((data) => {
                    const uniqueCategories = Array.from(
                        new Set(
                            data
                                .map((item) => item.category)
                                .filter(
                                    (category) => !category.toLowerCase().includes("onbekend") // Filter out missing data
                                )
                        )
                    );
                    setCategories(uniqueCategories);
                });
        }
    }, []);

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Fetch data again and filter for the selected category
        fetchFilteredData(selectedCategory).then((filteredData) => {
            setDisplayData(filteredData); // Update the displayData state
        });
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="category">Category</label>
                <select
                    name="category"
                    id="category"
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                >
                    <option value="" disabled>
                        Select a category
                    </option>
                    {categories.map((category, index) => (
                        <option key={index} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
                <button type="submit">Submit</button>
            </form>
            <div className="category">
                {displayData.length > 0 ? (
                    displayData.map((item, index) => (
                        <div key={index}>
                            <h2>{item.category}</h2>
                            <p>Year: {item.year}</p>
                            <p>Value: {item.value}</p>
                        </div>
                    ))
                ) : (
                    <p>Make a selection on what data u want to see</p>
                )}
            </div>
        </>
    );
}

export default DataManager;
