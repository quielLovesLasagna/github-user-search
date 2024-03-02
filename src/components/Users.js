import User from "./User";

export default function Users({ users }) {
	return (
		<div className="users">
			{users.map((user) => (
				<User user={user} key={user.id} />
			))}
		</div>
	);
}
