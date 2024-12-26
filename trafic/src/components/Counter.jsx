import React from "react";
import { useData } from "./DataContext";

function Counter() {
    const data = useData();

    return (
        <div>
            <h1>Counter Component</h1>
            {data.map((item, index) => (
                <div key={index}>
                    <h3>{item.category}</h3>
                    <p>Value: {item.value}</p>
                </div>
            ))}
        </div>
    );
}

export default Counter;