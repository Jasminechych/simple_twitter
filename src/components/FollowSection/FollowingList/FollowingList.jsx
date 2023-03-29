import style from 'src/components/FollowSection/FollowingList/FollowingList.module.scss';
import { Header } from 'src/components/Header/Header';
import { MainSection } from 'src/components/MainSection/MainSection';
import { UserItem } from 'src/components/UserItem/UserItem';
import { ReactComponent as BackArrow } from 'src/assets/icons/back.svg';
import { Link } from 'react-router-dom';
import { getsUsersFollowing } from 'src/apis/user';
import { useEffect, useState } from 'react';

export const FollowingList = ({ name, tweets }) => {
	const currentUserId = JSON.parse(localStorage.getItem('currentUser')).currentUserId;
	console.log('currentUserId: ', currentUserId);
	const [usersFollowingsData, setUsersFollowingsData] = useState(false);
	const [isUsersFollowingsDataLoaded, setUsersIsFollowingsDataLoaded] = useState(false);

	// 查看此使用者ID追蹤中的人

	useEffect(() => {
		const getFollowingsUsersAsync = async () => {
			try {
				const data = await getsUsersFollowing(currentUserId);
				console.log('getsUsersFollowing: ', data);
				setUsersFollowingsData(data);
				setUsersIsFollowingsDataLoaded(true);
			} catch (error) {
				console.log(error);
			}
		};
		getFollowingsUsersAsync();
	}, []);

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
					{isUsersFollowingsDataLoaded ? (
						usersFollowingsData.map(({ Following }) => {
							return (
								<UserItem
									key={Following.id}
									id={Following.id}
									name={Following.name}
									avatar={Following.avatar}
									description={Following.description}
									isFollowing='true'
								/>
							);
						})
					) : (
						<h5>loading...</h5>
					)}
				</div>
			</div>
		</MainSection>
	);
};
