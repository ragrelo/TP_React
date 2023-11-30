import React from "react";
import Nav from "../Navbar/Navbar";
import "./homeScreen.css";
import Banner from "../Banner/Banner";
import Row from "../Row/Row";
import requests from "../../request";

const HomeScreen = () => {
	return (
		<div>
			<Nav />
			<Banner />
			<Row title="NETFLIX ORIGINALES" fetchUrl={requests.fetchNetflixOriginals}
				isLargeRow />

			<Row title="Trending Ahora" fetchUrl={requests.fetchTrending} isLargeRow />

			<Row title="Top" fetchUrl={requests.fetchTopRated} isLargeRow />

			<Row title="Romance" fetchUrl={requests.fetchRomanceMovies} isLargeRow />

			<Row title="Acción" fetchUrl={requests.fetchActionMovies} isLargeRow />

			<Row title="Horror" fetchUrl={requests.fetchHorrorMovies} isLargeRow />

			<Row title="Comedia" fetchUrl={requests.fetchComedyMovies} isLargeRow />

			<Row title="Documentales" fetchUrl={requests.fetchDocumentaries} isLargeRow />
		</div>
	);
};

export default HomeScreen;
