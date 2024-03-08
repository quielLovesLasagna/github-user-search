import { useState } from "react";
import Form from "./Form";
import Users from "./Users";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import UserDetails from "./UserDetails";
import { useUserSearch } from "./useUserSearch";

export default function App() {
	const [query, setQuery] = useState("");
	const [selectedId, setSelectedId] = useState(null);
	const [selectedUser, setSelectedUser] = useState(null);
	const { results, isLoading, error, searchUser } = useUserSearch();

	function handleUserSearch() {
		searchUser(query);
	}

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

	return (
		<>
			<header className="header">
				<Form
					query={query}
					setQuery={setQuery}
					onSearchUser={handleUserSearch}
				/>
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
