import React, { useState, useEffect } from "react";
import CountUp from 'react-countup';
import { useData } from "./DataContext";

function Counter() {
    const data = useData();
    const [startTime, setStartTime] = useState(0); // State to store the time when the component loads

    useEffect(() => {
        const currentDate = new Date();
        const startOfYear = new Date(currentDate.getFullYear(), 0, 1); // January 1st of the current year

        // Store start time when the component loads (for better precision)
        setStartTime(startOfYear);
    }, []); // Runs only once on initial mount

    // Grouping data by overarching category
    const groupedData = data.reduce((acc, item) => {
        const baseCategory = item.category.split(" - ")[0];

        if (!acc[baseCategory]) {
            acc[baseCategory] = { 
                items: [], 
                startYear: Infinity,
                endYear: -Infinity,
                totalValue: 0, 
            };
        }

        acc[baseCategory].items.push(item);
        acc[baseCategory].startYear = Math.min(acc[baseCategory].startYear, parseInt(item.year));
        acc[baseCategory].endYear = Math.max(acc[baseCategory].endYear, parseInt(item.year));
        acc[baseCategory].totalValue += item.value;

        return acc;
    }, {});

    // Calculate median values for each group
    const calculateMedian = (values) => {
        if (!values.length) return 0;
        const sorted = [...values].sort((a, b) => a - b);
        const middle = Math.floor(sorted.length / 2);
        return sorted.length % 2 === 0
            ? (sorted[middle - 1] + sorted[middle]) / 2
            : sorted[middle];
    };

    const result = Object.entries(groupedData).map(([category, group]) => {
        const values = group.items.map(item => item.value);
        return {
            category,
            startYear: group.startYear,
            endYear: group.endYear,
            medianValue: calculateMedian(values),
            totalValue: group.totalValue,
        };
    });

    // Calculate the current value based on progress throughout the year
    const getCurrentValue = (startYear, endYear, totalValue) => {
        const currentYear = new Date().getFullYear();
        const currentDate = new Date();
        const startOfYear = new Date(currentYear, 0, 1); // January 1st of the current year
        const endOfYear = new Date(currentYear, 11, 31); // December 31st of the current year

        // Calculate elapsed time since the start of the year in days
        const elapsedTime = (currentDate - startOfYear) / (1000 * 60 * 60 * 24); // In days
        const totalDaysInYear = (endOfYear - startOfYear) / (1000 * 60 * 60 * 24); // Total days in the year

        // Ensure elapsed time does not exceed the total days in the year
        const progress = Math.min(elapsedTime / totalDaysInYear, 1); // Ensuring the progress doesn't exceed 100%

        return totalValue * progress;
    };

    // Calculate the duration (in seconds) until the end of the year
    const getRemainingTimeInSeconds = () => {
        const currentDate = new Date();
        const endOfYear = new Date(currentDate.getFullYear(), 11, 31); // Dec 31, current year
        const remainingTime = endOfYear - currentDate; // Remaining time in milliseconds
        return remainingTime / 1000; // Convert milliseconds to seconds
    };

    return (
        <div>
            <h1>Grouped Data</h1>
            {result.map((group, index) => {
                const remainingTime = getRemainingTimeInSeconds();
                return (
                    <div key={index}>
                        <h2>Category: {group.category}</h2>
                        <p>Start Year: {group.startYear}</p>
                        <p>End Year: {group.endYear}</p>
                        <p>Median Value: {group.medianValue}</p>
                        <p>Total Value: {group.totalValue}</p>
                        <CountUp 
                            start={getCurrentValue(group.startYear, group.endYear, group.totalValue)}
                            end={group.totalValue}
                            duration={remainingTime} // Set duration based on remaining time in the year
                            separator=","
                        />
                    </div>
                );
            })}
        </div>
    );
}

export default Counter;