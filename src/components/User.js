export default function User({ user, onSelectUser }) {
	return (
		<div className="user" onClick={() => onSelectUser(user.id)}>
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
				<p className="user__name">{user.login}</p>
			</div>
		</div>
	);
}
