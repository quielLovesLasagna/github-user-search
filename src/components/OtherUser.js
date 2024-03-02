export default function OtherUser({ user }) {
	return (
		<p>
			<a href={user.html_url} target="_blank" rel="noreferrer">
				{user.login}
			</a>
		</p>
	);
}
