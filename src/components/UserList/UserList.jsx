import style from 'src/components/UserList/UserList.module.scss';
import { UserCard } from 'src/components/UserCard/UserCard';

const dummyData = [
	{
		id: 1,
		email: 'root@example.com',
		account: 'root',
		name: 'root',
		role: 'admin',
		avatar: 'https://cdn-icons-png.flaticon.com/512/1144/1144760.png',
		cover: '',
		introduction: null,
		createdAt: '2023-03-07T14:17:11.000Z',
		updatedAt: '2023-03-07T14:33:46.000Z',
	},
	{
		id: 2,
		email: 'user1@example.com',
		account: 'user1',
		name: 'user1',
		role: 'user',
		avatar: 'https://cdn-icons-png.flaticon.com/512/1144/1144760.png',
		cover: '',
		introduction: null,
		createdAt: '2023-03-07T14:17:11.000Z',
		updatedAt: '2023-03-07T14:33:46.000Z',
		tweetsCounts: '10',
		followingCounts: '1',
		followerCounts: '2',
		likedCounts: '2',
	},
	{
		id: 3,
		email: 'user2@example.com',
		account: 'user2',
		name: 'user2',
		role: 'user',
		avatar: 'https://cdn-icons-png.flaticon.com/512/1144/1144760.png',
		cover: '',
		introduction: null,
		createdAt: '2023-03-07T14:17:11.000Z',
		updatedAt: '2023-03-07T14:33:46.000Z',
		tweetsCounts: '10',
		followingCounts: '1',
		followerCounts: '2',
		likedCounts: '2',
	},
	{
		id: 4,
		email: 'user2@example.com',
		account: 'user2',
		name: 'user2',
		role: 'user',
		avatar: 'https://cdn-icons-png.flaticon.com/512/1144/1144760.png',
		cover: '',
		introduction: null,
		createdAt: '2023-03-07T14:17:11.000Z',
		updatedAt: '2023-03-07T14:33:46.000Z',
		tweetsCounts: '10',
		followingCounts: '1',
		followerCounts: '2',
		likedCounts: '2',
	},
	// {
	// 	id: 5,
	// 	email: 'user2@example.com',
	// 	account: 'user2',
	// 	name: 'user2',
	// 	role: 'user',
	// 	avatar: 'https://cdn-icons-png.flaticon.com/512/1144/1144760.png',
	// 	cover: '',
	// 	introduction: null,
	// 	createdAt: '2023-03-07T14:17:11.000Z',
	// 	updatedAt: '2023-03-07T14:33:46.000Z',
	// 	tweetsCounts: '10',
	// 	followingCounts: '1',
	// 	followerCounts: '2',
	// 	likedCounts: '2',
	// },
	// {
	// 	id: 6,
	// 	email: 'user2@example.com',
	// 	account: 'user2',
	// 	name: 'user2',
	// 	role: 'user',
	// 	avatar: 'https://cdn-icons-png.flaticon.com/512/1144/1144760.png',
	// 	cover: '',
	// 	introduction: null,
	// 	createdAt: '2023-03-07T14:17:11.000Z',
	// 	updatedAt: '2023-03-07T14:33:46.000Z',
	// 	tweetsCounts: '10',
	// 	followingCounts: '1',
	// 	followerCounts: '2',
	// 	likedCounts: '2',
	// },
];

export const UserList = () => {
	return (
		<div className={style.userListContainer}>
			{dummyData.map(
				({
					id,
					account,
					name,
					role,
					avatar,
					cover,
					tweetsCounts,
					followingCounts,
					followerCounts,
					likedCounts,
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
							tweetsCounts={tweetsCounts}
							followingCounts={followingCounts}
							followerCounts={followerCounts}
							likedCounts={likedCounts}
						/>
					);
				},
			)}
		</div>
	);
};
