import { TweetItem } from 'src/components/TweetItem/TweetItem';
import style from 'src/components/TweetList/TweetList.module.scss';

const dummyData = [
	{
		// 第一個id 是tweet 的id
		id: '2',
		description: 'Good job!',
		// 二個是這個推文的作者id
		UserId: '3',
		updatedAt: '2023-03-19T00:00:59.000Z',
		createdAt: '2023-03-19T00:00:59.000Z',
		replyCounts: '3',
		likeCounts: '4',
		User: {
			// 第三個跟第二個一樣 主要是要把name, avatar帶出來用的
			id: '5',
			account: 'user5',
			name: 'user5',
			avatar: 'https://cdn-icons-png.flaticon.com/512/1144/1144760.png',
		},
		isLiked: 'true',
	},
	{
		// 第一個id 是tweet 的id
		id: '3',
		description:
			'Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum. ',
		// 二個是這個推文的作者id
		UserId: '4',
		updatedAt: '2023-03-19T00:00:59.000Z',
		createdAt: '2023-03-19T00:00:59.000Z',
		replyCounts: '3',
		likeCounts: '4',
		User: {
			// 第三個跟第二個一樣 主要是要把name, avatar帶出來用的
			id: '6',
			account: 'user6',
			name: 'user6',
			avatar: 'https://cdn-icons-png.flaticon.com/512/1144/1144760.png',
		},
		isLiked: 'false',
	},
];

export const TweetList = () => {
	return (
		<div className={style.tweetList}>
			{dummyData.map(({ id, description, createdAt, replyCounts, likeCounts, User, isLiked }) => {
				const createdAtDate = new Date(createdAt);
				const hour = createdAtDate.getHours();
				return (
					<TweetItem
						key={id}
						id={id}
						description={description}
						avatar={User.avatar}
						userName={User.name}
						userAccount={User.account}
						createdAt={hour}
						replyCounts={replyCounts}
						likeCounts={likeCounts}
						isLiked={isLiked}
					/>
				);
			})}
		</div>
	);
};
