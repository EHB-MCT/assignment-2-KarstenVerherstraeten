import React from 'react';
import { useEffect } from 'react';

function Counter() {
    // script section

    //fetch data from the backend
    useEffect(() => {
        fetch("http://localhost:3000/traffic-data")
            .then((response) => response.json())
            .then((data) => console.log(data));
        
    }, []);

    //html section
  return (
    <div>
      <h1>Counter</h1>
    </div>
  );
}

export default Counter;