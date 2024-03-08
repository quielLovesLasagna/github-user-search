import OtherUser from "./OtherUser";
import { useFetchOtherUser } from "./useFetchOtherUser";

export default function UserDetails({ user, onCloseDetails }) {
	const followers = useFetchOtherUser(user.follower_url);
	const following = useFetchOtherUser(user.following_url);

	return (
		<div className="user__details">
			<button className="close-btn" onClick={onCloseDetails}>
				X
			</button>
			<div className="user__avatar-container">
				<img
					src={user.avatar_url}
					alt={`${user.login}'s avatar`}
					className="user__avatar"
				/>
			</div>
			<div className="user__info">
				<p className="user__name">
					<span className="user__tag">Name: </span>
					{user.login}
				</p>
				<p>
					<span className="user__tag">Profile link: </span>
					<a href={user.html_url}>{user.html_url}</a>
				</p>
				<div className="user__followers">
					<p className="user__tag">Followers: </p>
					{followers.length > 0
						? followers.map((follower) => (
								<OtherUser key={follower.id} user={follower} />
						  ))
						: "User has no followers or there was a problem fetching the data. Please try again later."}
				</div>
				<div className="user__followers">
					<p className="user__tag">Following: </p>
					{following.length > 0
						? following.map((user) => <OtherUser key={user.id} user={user} />)
						: "User does not follow anybody or there was a problem fetching the data. Please try again later."}
				</div>
			</div>
		</div>
	);
}
