import React from 'react';
import Navbar from '../components/Navbar.jsx';
import { Link } from 'react-router-dom';
import Counter from '../components/Counter.jsx';
function Home() {
	return (
		<>
         <Navbar />
			<h1>Trafic Data</h1>
            <p>
                Welcome to the visualisation of belgium police data. 
                for more info about the data I use:<Link to="/info">Click here</Link>.
            </p>

            <p>
    The goal of this project is to make data from the Belgian police easier to understand by showing how often accidents happen in Belgium.  
    Using the latest police statistics, the data is visualized in a way that helps people see the patterns and frequency of these accidents over time.  
</p>

<Counter />
		</>
	);
}

export default Home;