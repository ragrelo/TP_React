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
			<Row title="NETFLIX ORIGINALS" fetchUrl={requests.fetchNetflixOriginals}
				isLargeRow />

			<Row title="Trending now" fetchUrl={requests.fetchTrending} isLargeRow />

			<Row title="Top Rated" fetchUrl={requests.fetchTopRated} isLargeRow />

			<Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} isLargeRow />

			<Row title="Action Movies" fetchUrl={requests.fetchActionMovies} isLargeRow />

			<Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} isLargeRow />

			<Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} isLargeRow />

			<Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} isLargeRow />
		</div>
	);
};

export default HomeScreen;
