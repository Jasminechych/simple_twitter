import style from 'src/components/FollowSection/FollowSection.module.scss';
import { UserItem } from 'src/components/UserItem/UserItem';
import { FollowerList } from 'src/components/FollowSection/FollowerList/FollowerList';
import { FollowingList } from 'src/components/FollowSection/FollowingList/FollowingList';
import { MainSection } from 'src/components/MainSection/MainSection';
import { ReactComponent as BackArrow } from 'src/assets/icons/back.svg';
import { Header } from 'src/components/Header/Header';

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
		isFollowing: false,
	},
];

export const FollowSection = ({ name, tweets }) => {
	return (
		<MainSection>
			<div className={style.followHeaderWrapper}>
				<BackArrow className={style.backArrow} />
				<div className={style.followHeader}>
					<Header header={name} className={style.header} />
					<a href='' className={style.tweets}>{`${tweets}推文`}</a>
				</div>
			</div>
			<div className={style.followSectionContainer}>
				<div className={style.followTabWrapper}>
					<FollowerList />
					<FollowingList />
				</div>
				<div className={style.userItemWrapper}>
					{dummyFollowData.map(({ id, User, description, isFollowing }) => {
						return (
							<UserItem
								key={id}
								id={id}
								name={User.name}
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
