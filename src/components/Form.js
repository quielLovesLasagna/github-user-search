export default function Form({ query, setQuery, onSearchUser }) {
	function handleSubmit(e) {
		e.preventDefault();

		onSearchUser(query);
	}

	return (
		<form className="form" onSubmit={(e) => handleSubmit(e)}>
			<input
				type="text"
				placeholder="Enter username or email"
				className="form__input"
				value={query}
				onChange={(e) => setQuery(e.target.value)}
			/>
			<button type="submit" className="form__button">
				Search
			</button>
		</form>
	);
}
