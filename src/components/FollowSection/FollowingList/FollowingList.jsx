import style from 'src/components/FollowSection/FollowingList/FollowingList.module.scss';
import { Header } from 'src/components/Header/Header';
import { MainSection } from 'src/components/MainSection/MainSection';
import { UserItem } from 'src/components/UserItem/UserItem';
import { ReactComponent as BackArrow } from 'src/assets/icons/back.svg';
import { Link } from 'react-router-dom';

const dummyFollowData = [
	{
		// 第一個id 是tweet 的id
		id: '2',
		// 二個是這個推文的作者id
		UserId: '3',
		description:
			'Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum.',
		User: {
			// 第三個跟第二個一樣 主要是要把name, avatar帶出來用的
			id: '5',
			account: 'Miki',
			name: 'Miki',
			avatar: 'https://cdn-icons-png.flaticon.com/512/1144/1144760.png',
		},
		isFollowing: true,
	},
	{
		// 第一個id 是tweet 的id
		id: '3',
		// 二個是這個推文的作者id
		UserId: '4',
		description: 'Good job!',
		User: {
			// 第三個跟第二個一樣 主要是要把name, avatar帶出來用的
			id: '6',
			account: 'Jasmine',
			name: 'Jasmine',
			avatar: 'https://cdn-icons-png.flaticon.com/512/1144/1144760.png',
		},
		isFollowing: true,
	},
	{
		// 第一個id 是tweet 的id
		id: '4',
		// 二個是這個推文的作者id
		UserId: '5',
		description: 'Good job!',
		User: {
			// 第三個跟第二個一樣 主要是要把name, avatar帶出來用的
			id: '6',
			account: 'Jasmine',
			name: 'Jasmine',
			avatar: 'https://cdn-icons-png.flaticon.com/512/1144/1144760.png',
		},
		isFollowing: true,
	},
	{
		// 第一個id 是tweet 的id
		id: '5',
		// 二個是這個推文的作者id
		UserId: '6',
		description:
			'Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum.',
		User: {
			// 第三個跟第二個一樣 主要是要把name, avatar帶出來用的
			id: '6',
			account: 'Jasmine',
			name: 'Jasmine',
			avatar: 'https://cdn-icons-png.flaticon.com/512/1144/1144760.png',
		},
		isFollowing: true,
	},
	{
		// 第一個id 是tweet 的id
		id: '6',
		// 二個是這個推文的作者id
		UserId: '7',
		description:
			'Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum.',
		User: {
			// 第三個跟第二個一樣 主要是要把name, avatar帶出來用的
			id: '6',
			account: 'Jasmine',
			name: 'Jasmine',
			avatar: 'https://cdn-icons-png.flaticon.com/512/1144/1144760.png',
		},
		isFollowing: true,
	},
];

export const FollowingList = ({ name, tweets }) => {
	return (
		<MainSection>
			<div className={style.followHeaderWrapper}>
				<Link to='/user/self'>
					<BackArrow className={style.backArrow} />
				</Link>
				<div className={style.followHeader}>
					<Header header={name} className={style.header} />
					<a href='' className={style.tweets}>{`${tweets}推文`}</a>
				</div>
			</div>
			<div className={style.followingListContainer}>
				<div className={style.followTabWrapper}>
					<Link to='/follower' className={style.followerListTitle}>
						追隨者
					</Link>
					<div className={style.followingListTitle}>正在追隨</div>
				</div>
				<div className={style.userItemWrapper}>
					{dummyFollowData.map(({ id, User, description, isFollowing }) => {
						return (
							<UserItem
								key={id}
								id={id}
								name={User.name}
								avatar={User.avatar}
								description={description}
								initIsFollowing={isFollowing}
							/>
						);
					})}
				</div>
			</div>
		</MainSection>
	);
};
