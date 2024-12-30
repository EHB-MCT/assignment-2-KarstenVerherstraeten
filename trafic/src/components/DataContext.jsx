import React, { createContext, useContext, useEffect, useRef, useState } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const hasFetched = useRef(false);
    const [displayData, setDisplayData] = useState([]);

    useEffect(() => {
        if (!hasFetched.current) {
            hasFetched.current = true;
            fetch("http://localhost:3000/traffic-data")
                .then((response) => response.json())
                .then((data) => {
                    const filteredData = data.filter(
                        (item) => !item.category.toLowerCase().includes("onbekend")
                    );
                    setDisplayData(filteredData);
                });
        }
    }, []);

    return (
        <DataContext.Provider value={displayData}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => useContext(DataContext);