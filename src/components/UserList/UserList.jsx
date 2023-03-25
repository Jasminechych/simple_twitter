import style from 'src/components/UserList/UserList.module.scss';
import { UserCard } from 'src/components/UserCard/UserCard';
import { useState, useEffect } from 'react';
import { getAdminUsers } from 'src/apis/admin';

export const UserList = () => {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		const getAdminUsersAsync = async () => {
			try {
				const data = await getAdminUsers();
				console.log('data: ', data);
				if (data.length > 0) {
					setUsers(data);
				}
			} catch (error) {
				console.error(error);
			}
		};
		getAdminUsersAsync();
	}, []);

	return (
		<div className={style.userListContainer}>
			{users.map(
				({
					id,
					account,
					name,
					role,
					avatar,
					cover,
					TweetsCounts,
					followingCounts,
					followerCounts,
					LikedCounts,
				}) => {
					if (role === 'admin') return;
					return (
						<UserCard
							key={id}
							id={id}
							account={account}
							name={name}
							role={role}
							avatar={avatar}
							cover={cover}
							tweetsCounts={TweetsCounts}
							followingCounts={followingCounts}
							followerCounts={followerCounts}
							likedCounts={LikedCounts}
						/>
					);
				},
			)}
		</div>
	);
};
