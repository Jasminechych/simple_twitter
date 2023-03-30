import style from 'src/components/FollowSection/FollowingList/FollowingList.module.scss';
import { Header } from 'src/components/Header/Header';
import { MainSection } from 'src/components/MainSection/MainSection';
import { UserItem } from 'src/components/UserItem/UserItem';
import { ReactComponent as BackArrow } from 'src/assets/icons/back.svg';
import { Link } from 'react-router-dom';
import { getsUsersFollowing, postFollowShips, deleteFollowShips } from 'src/apis/user';
import { useEffect, useState } from 'react';
import { useUserData } from 'src/context/UserContext';

export const FollowingList = () => {
	const currentUserId = JSON.parse(localStorage.getItem('currentUser')).currentUserId;
	const [usersFollowingsData, setUsersFollowingsData] = useState([]);
	const [isUsersFollowingsDataLoaded, setUsersIsFollowingsDataLoaded] = useState(false);
	const [followShipState, setFollowShipState] = useState({ userId: '', followShip: '' });

	// 把使用者資訊拿出來用
	const { currentUserInfo, usersTweets } = useUserData();

	// 查看此使用者ID追蹤中的人
	useEffect(() => {
		const getFollowingsUsersAsync = async () => {
			try {
				const data = await getsUsersFollowing(currentUserId);
				setUsersFollowingsData(data);
				setUsersIsFollowingsDataLoaded(true);
			} catch (error) {
				console.log(error);
			}
		};
		getFollowingsUsersAsync();
	}, []);

	const handleFollowClick = (id, followOrUnFollow) => {
		setUsersIsFollowingsDataLoaded(false);
		setFollowShipState({ userId: id, followShip: followOrUnFollow });
	};
	// 取消追蹤或追蹤某位使用者
	useEffect(() => {
		const followShipAsync = async () => {
			if (followShipState.followShip === 'follow') {
				try {
					await postFollowShips(followShipState.userId);
					const followingData = await getsUsersFollowing(currentUserId);
					setUsersFollowingsData(followingData);
					setUsersIsFollowingsDataLoaded(true);
				} catch (error) {
					console.log(error);
				}
				return;
			}
			if (followShipState.followShip === 'unFollow') {
				try {
					await deleteFollowShips(followShipState.userId);
					const followingData = await getsUsersFollowing(currentUserId);
					setUsersFollowingsData(followingData);
					setUsersIsFollowingsDataLoaded(true);
				} catch (error) {
					console.log(error);
				}
				return;
			}
		};
		followShipAsync();
	}, [followShipState]);

	return (
		<MainSection>
			<div className={style.followHeaderWrapper}>
				<Link to='/user/self'>
					<BackArrow className={style.backArrow} />
				</Link>
				<div className={style.followHeader}>
					<Header header={currentUserInfo.name} className={style.header} />
					<a href='' className={style.tweets}>{`${usersTweets.length}推文`}</a>
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
									handleFollowClick={handleFollowClick}
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
