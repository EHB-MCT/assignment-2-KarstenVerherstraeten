import React, { useState, useEffect } from "react";
import CountUp from 'react-countup';
import { useData } from "./DataContext";

function Counter() {
    const data = useData();
    const [startValues, setStartValues] = useState({}); // To store last displayed values and timestamps

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

    // Generate results from grouped data
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

    const getCurrentValue = (totalValue) => {
        const currentDate = new Date();
        const startOfYear = new Date(currentDate.getFullYear(), 0, 1); 
        const endOfYear = new Date(currentDate.getFullYear(), 11, 31); 

        const elapsedTime = (currentDate - startOfYear) / (1000 * 60 * 60 * 24);
        const totalDaysInYear = (endOfYear - startOfYear) / (1000 * 60 * 60 * 24);
        const progress = Math.min(elapsedTime / totalDaysInYear, 1);

        return totalValue * progress;
    };

    const getRemainingTimeInSeconds = () => {
        const currentDate = new Date();
        const endOfYear = new Date(currentDate.getFullYear(), 11, 31); 
        return (endOfYear - currentDate) / 1000;
    };

    useEffect(() => {
        const initialStartValues = {};
        result.forEach(group => {
            const currentValue = getCurrentValue(group.totalValue);
            initialStartValues[group.category] = {
                value: currentValue,
                timestamp: Date.now(), // Store current timestamp
            };
        });
        setStartValues(initialStartValues);
    }, [data]);

    const calculateAccurateValue = (category, totalValue) => {
        const now = Date.now();
        const elapsedSeconds = (now - (startValues[category]?.timestamp || now)) / 1000;

        const currentValue = startValues[category]?.value || 0;
        const totalSecondsInYear = getRemainingTimeInSeconds() + elapsedSeconds;

        // Progress for the elapsed time
        const progress = elapsedSeconds / totalSecondsInYear;
        return currentValue + (totalValue * progress);
    };

    return (
        <div>
            <h1>Grouped Data</h1>
            {result.map((group, index) => {
                const remainingTime = getRemainingTimeInSeconds();
                const accurateStart = calculateAccurateValue(group.category, group.totalValue);

                return (
                    <div key={index}>
                        <h2>Category: {group.category}</h2>
                        <p>Start Year: {group.startYear}</p>
                        <p>End Year: {group.endYear}</p>
                        <p>Median Value: {group.medianValue}</p>
                        <p>Total Value: {group.totalValue}</p>
                        <CountUp 
                            start={accurateStart}
                            end={group.totalValue}
                            duration={remainingTime}
                            separator=","
                            onEnd={() => {
                                setStartValues(prev => ({
                                    ...prev,
                                    [group.category]: {
                                        value: group.totalValue,
                                        timestamp: Date.now(), // Update with the current timestamp
                                    },
                                }));
                            }}
                        />
                    </div>
                );
            })}
        </div>
    );
}

export default Counter;