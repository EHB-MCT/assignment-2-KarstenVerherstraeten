import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import PageNotFound from "./pages/404.jsx";
import Info from "./pages/Info.jsx";
import "./App.css";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
        <Route path="/info" element={<Info/>}/>
				<Route path="*" element={<PageNotFound />} /> {/* 404 page */}
			</Routes>
		</Router>
	);
}

export default App;
