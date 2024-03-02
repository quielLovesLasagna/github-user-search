import { useState } from "react";
import Form from "./Form";
import Users from "./Users";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";

const API = "https://api.github.com/search/users?q=";

export default function App() {
	const [query, setQuery] = useState("");
	const [prevQuery, setPrevQuery] = useState("");
	const [results, setResults] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	async function searchUser(query) {
		try {
			setIsLoading(true);
			setError("");

			// ! -- If current query is the same as prevQuery, exit
			if (query === prevQuery) {
				setIsLoading(false);
				return;
			}

			const res = await fetch(`${API}${query}`);

			if (!res.ok) {
				throw new Error(
					"There was a problem fetching the data, please try again later"
				);
			}

			const data = await res.json();

			console.log(data);

			if (!data.total_count) {
				throw new Error("No users found");
			}

			setResults(data.items);
			setPrevQuery(query);
		} catch (err) {
			if (err instanceof TypeError && err.message === "Failed to fetch") {
				setError("Please check your internet connection");
			} else {
				setError(err.message);
			}
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<>
			<header className="header">
				<Form query={query} setQuery={setQuery} onSearchUser={searchUser} />
			</header>
			<main className="main">
				<p className="results">Results</p>
				{isLoading && <Loader />}
				{error && <ErrorMessage message={error} />}
				{!isLoading && !error && <Users users={results} />}
			</main>
		</>
	);
}
