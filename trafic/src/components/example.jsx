import React from 'react';

// ExampleComponent is a functional component that displays a simple message
const ExampleComponent = () => {
    // The message to be displayed
    const message = "Hello, this is an example component!";

    // Render the component
    return (
        <div>
            {/* Display the message */}
            <p>{message}</p>
        </div>
    );
};

export default ExampleComponent;