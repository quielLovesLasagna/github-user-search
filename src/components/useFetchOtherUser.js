import { useState, useEffect } from "react";

export function useFetchOtherUser(url) {
	const [data, setData] = useState([]);

	useEffect(
		function () {
			async function fetchData() {
				try {
					const res = await fetch(url);
					const data = await res.json();
					setData(data);
				} catch (err) {
					console.log(err);
				}
			}
			fetchData();

			return function () {
				setData([]);
			};
		},
		[url]
	);

	return data;
}
