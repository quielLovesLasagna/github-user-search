import { useState } from "react";

const API = "https://api.github.com/search/users?q=";

export function useUserSearch() {
	const [prevQuery, setPrevQuery] = useState("");
	const [results, setResults] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

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

	return { results, isLoading, error, searchUser };
}
