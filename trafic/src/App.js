import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Importing necessary components from react-router-dom
import Home from "./pages/Home.jsx"; // Importing the Home component
import PageNotFound from "./pages/404.jsx"; // Importing the 404 PageNotFound component
import Info from "./pages/Info.jsx"; // Importing the Info component
import "./App.css"; // Importing the CSS file for styling

function App() {
	return (
		<Router> {/* Wrapping the application in Router to enable routing */}
			<Routes> {/* Defining the routes for the application */}
				<Route path="/" element={<Home />} /> {/* Route for the Home component */}
				<Route path="/info" element={<Info/>}/> 
				<Route path="*" element={<PageNotFound />} /> {/* Route for the 404 PageNotFound component */}
			</Routes>
		</Router>
	);
}

export default App; // Exporting the App component as the default export
