export default function User({ user }) {
	return (
		<div className="user">
			<div className="user__avatar-container">
				<img
					src={user.avatar_url}
					alt={`${user.login}'s avatar`}
					className="user__avatar-background"
				/>
				<img
					src={user.avatar_url}
					alt={`${user.login}'s avatar`}
					className="user__avatar"
				/>
			</div>
			<div className="user__info">
				<p className="user__name">
					<a href={user.html_url} target="_blank" rel="noreferrer">
						{user.login}
					</a>
				</p>
			</div>
		</div>
	);
}
