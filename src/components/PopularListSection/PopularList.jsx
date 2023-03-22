import style from 'src/components/PopularListSection/PopularList.module.scss';
import { PopularListItem } from 'src/components/PopularListSection/PopularListItem';

const dummyFollowData = [
	{
		// 第一個id 是tweet 的id
		id: '2',
		// 二個是這個推文的作者id
		UserId: '3',
		User: {
			// 第三個跟第二個一樣 主要是要把name, avatar帶出來用的
			id: '5',
			account: 'Miki',
			name: 'Miki',
			avatar: 'https://cdn-icons-png.flaticon.com/512/1144/1144760.png',
		},
		isFollowing: 'true',
	},
	{
		// 第一個id 是tweet 的id
		id: '3',
		// 二個是這個推文的作者id
		UserId: '4',
		User: {
			// 第三個跟第二個一樣 主要是要把name, avatar帶出來用的
			id: '6',
			account: 'Jasmine',
			name: 'Jasmine',
			avatar: 'https://cdn-icons-png.flaticon.com/512/1144/1144760.png',
		},
		isFollowing: 'false',
	},
];

export const PopularList = () => {
	return (
		<div className={style.popularListContainer}>
			{dummyFollowData.map(({ id, User, isFollowing }) => {
				return (
					<PopularListItem
						key={id}
						id={id}
						name={User.name}
						avatar={User.avatar}
						account={User.account}
						initIsFollowing={isFollowing}
					/>
				);
			})}
		</div>
	);
};
