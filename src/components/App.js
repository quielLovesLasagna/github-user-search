import { useState } from "react";
import Form from "./Form";
import Users from "./Users";

const API = "https://api.github.com/search/users?q=";

export default function App() {
	const [query, setQuery] = useState("");
	const [results, setResults] = useState([]);

	async function searchUser(query) {
		try {
			const res = await fetch(`${API}${query}`);
			const data = await res.json();
			setResults(data.items);
		} catch (err) {
			console.log(err);
		}
	}

	return (
		<>
			<header className="header">
				<Form query={query} setQuery={setQuery} onSearchUser={searchUser} />
			</header>
			<main className="main">
				<p className="results">Results</p>
				<Users users={results} />
			</main>
		</>
	);
}
