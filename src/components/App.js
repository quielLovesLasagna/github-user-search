import { useState } from "react";
import Form from "./Form";
import Users from "./Users";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import UserDetails from "./UserDetails";

const API = "https://api.github.com/search/users?q=";

export default function App() {
	const [query, setQuery] = useState("");
	const [prevQuery, setPrevQuery] = useState("");
	const [results, setResults] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const [selectedId, setSelectedId] = useState(null);
	const [selectedUser, setSelectedUser] = useState(null);

	function handleSelectUser(id) {
		setSelectedId(id);

		// ! -- Get selected user
		const user = results.find((user) => user.id === id);

		setSelectedUser(user);
	}

	function handleCloseDetails() {
		setSelectedId(null);
		setSelectedUser(null);
	}

	async function searchUser(query) {
		try {
			// ! -- If there is no query, exit
			if (!query) return;

			// ! -- If current query is the same as prevQuery, exit
			if (query === prevQuery) {
				setIsLoading(false);
				return;
			}

			setIsLoading(true);
			setError("");

			const res = await fetch(`${API}${query}`);

			if (!res.ok) {
				throw new Error(
					"There was a problem fetching the data, please try again later"
				);
			}

			const data = await res.json();

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
				{selectedUser ? (
					<UserDetails
						user={selectedUser}
						onCloseDetails={handleCloseDetails}
					/>
				) : (
					<p className="results">
						{!results.length ? "Search a user" : "Results"}
					</p>
				)}
				{isLoading && <Loader />}
				{error && <ErrorMessage message={error} />}
				{!isLoading && !error && !selectedId && (
					<Users users={results} onSelectUser={handleSelectUser} />
				)}
			</main>
		</>
	);
}
