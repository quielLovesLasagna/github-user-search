import User from "./User";

export default function Users({ users, onSelectUser }) {
	return (
		<div className="users">
			{users.map((user) => (
				<User user={user} key={user.id} onSelectUser={onSelectUser} />
			))}
		</div>
	);
}
