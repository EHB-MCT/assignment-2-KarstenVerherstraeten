// import all needed packages, components, and css modules
import React from "react";
import Navbar from "../components/Navbar.jsx";
import UpdateButton from "../components/UpdateButton.jsx";
import Counter from "../components/Counter.jsx";
import { DataProvider } from "../components/DataContext.jsx";
import style from "../modules/home.module.css";

function Home() {
	return (
		<>
		
			<Navbar />  {/* usage of a component that you imported */}
			<div className={style.home}> {/* the propper way to name a class using css modules */}
			<p className={style.left}>

				Welcome to my project! I am a student who tried to make a better visualisation of frequency of the trafic violations in belgium.
				You can see the data in the form of a counter, which shows the number of accidents that have happened in Belgium over the years.
			</p>

			<p className={style.right}>
				The goal of this project is to make data from the Belgian police easier
				to understand by showing how often accidents happen in Belgium. Using
				the latest police statistics, the data is visualized in a way that helps
				people see the patterns and frequency of these accidents over time.
			</p>
			<UpdateButton />
			<DataProvider>
				<Counter />
			</DataProvider>


			</div>

		
			
		</>
	);
}

export default Home;
