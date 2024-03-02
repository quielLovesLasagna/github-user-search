import { useEffect, useState } from "react";
import OtherUser from "./OtherUser";

export default function UserDetails({ user, onCloseDetails }) {
	const [followers, setFollowers] = useState([]);
	const [following, setFollowing] = useState([]);

	useEffect(
		function () {
			async function getFollowers() {
				try {
					const res = await fetch(user.followers_url);

					const data = await res.json();

					setFollowers(data);
				} catch (err) {
					console.log(err);
				}
			}
			getFollowers();

			return function () {
				setFollowers([]);
			};
		},

		[user.followers_url]
	);

	useEffect(
		function () {
			async function getFollowing() {
				try {
					const res = await fetch(user.following_url);

					const data = await res.json();

					setFollowing(data);
				} catch (err) {
					console.log(err);
				}
			}
			getFollowing();

			return function () {
				setFollowing([]);
			};
		},
		[user.following_url]
	);

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
