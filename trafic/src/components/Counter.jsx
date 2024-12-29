import React, { useState, useEffect } from "react";
import CountUp from 'react-countup';
import { useData } from "./DataContext";
import style from "../modules/counter.module.css";

function Counter() {
    const data = useData();
    const [startValues, setStartValues] = useState({});

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

    const calculateMedian = (values) => {
        if (!values.length) return 0;
        const sorted = [...values].sort((a, b) => a - b);
        const middle = Math.floor(sorted.length / 2);
        return sorted.length % 2 === 0
            ? (sorted[middle - 1] + sorted[middle]) / 2
            : sorted[middle];
    };

    const calculateAverageIncrease = (items) => {
        const yearlyIncreases = [];
        items.sort((a, b) => parseInt(a.year) - parseInt(b.year));
        for (let i = 1; i < items.length; i++) {
            yearlyIncreases.push(items[i].value - items[i - 1].value);
        }
        return yearlyIncreases.length
            ? yearlyIncreases.reduce((sum, increase) => sum + increase, 0) / yearlyIncreases.length
            : 0;
    };

    const result = Object.entries(groupedData).map(([category, group]) => {
        const values = group.items.map(item => item.value);
        const averageIncrease = calculateAverageIncrease(group.items);
        const lastYearValue = group.items.find(
            item => parseInt(item.year) === group.endYear
        )?.value || 0;

        return {
            category,
            startYear: group.startYear,
            endYear: group.endYear,
            medianValue: calculateMedian(values),
            totalValue: group.totalValue,
            estimatedEndValue: lastYearValue + averageIncrease,
        };
    });

    const getCurrentValue = (estimatedEndValue) => {
        const currentDate = new Date();
        const startOfYear = new Date(currentDate.getFullYear(), 0, 1);
        const endOfYear = new Date(currentDate.getFullYear(), 11, 31);

        const elapsedTime = (currentDate - startOfYear) / (1000 * 60 * 60 * 24);
        const totalDaysInYear = (endOfYear - startOfYear) / (1000 * 60 * 60 * 24);
        const progress = Math.min(elapsedTime / totalDaysInYear, 1);

        return estimatedEndValue * progress;
    };

    const getRemainingTimeInSeconds = () => {
        const currentDate = new Date();
        const endOfYear = new Date(currentDate.getFullYear(), 11, 31);
        return (endOfYear - currentDate) / 1000;
    };

    useEffect(() => {
        const initialStartValues = {};
        result.forEach(group => {
            const currentValue = getCurrentValue(group.estimatedEndValue);
            initialStartValues[group.category] = {
                value: currentValue,
                timestamp: Date.now(),
            };
        });
        setStartValues(initialStartValues);
    }, [data]);

    const calculateAccurateValue = (category, estimatedEndValue) => {
        const now = Date.now();
        const elapsedSeconds = (now - (startValues[category]?.timestamp || now)) / 1000;

        const currentValue = startValues[category]?.value || 0;
        const totalSecondsInYear = getRemainingTimeInSeconds() + elapsedSeconds;

        const progress = elapsedSeconds / totalSecondsInYear;
        return currentValue + (estimatedEndValue * progress);
    };

    return (
        <div className={style.counters}>
            {result.map((group, index) => {
                const remainingTime = getRemainingTimeInSeconds();
                const accurateStart = calculateAccurateValue(group.category, group.estimatedEndValue);

                return (
                    <div className={style.Category} key={index}>
                        <h2>{group.category}</h2>
                        <CountUp
                            start={accurateStart}
                            end={group.estimatedEndValue}
                            duration={remainingTime}
                            separator=","
                            onEnd={() => {
                                setStartValues(prev => ({
                                    ...prev,
                                    [group.category]: {
                                        value: group.estimatedEndValue,
                                        timestamp: Date.now(),
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