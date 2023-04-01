import { Link, useNavigate, useParams } from 'react-router-dom';
import style from 'src/components/FollowSection/FollowerList/FollowerList.module.scss';
import { Header } from 'src/components/Header/Header';
import { MainSection } from 'src/components/MainSection/MainSection';
import { ReactComponent as BackArrow } from 'src/assets/icons/back.svg';
import { UserItem } from 'src/components/UserItem/UserItem';
import { useEffect, useState, useMemo } from 'react';
import {
	getUsersFollowers,
	getsUsersFollowing,
	deleteFollowShips,
	postFollowShips,
	getUserData,
	getUserTweets,
} from 'src/apis/user';
import { useUserData } from 'src/context/UserContext';

export const FollowerList = () => {
	const currentUserId = JSON.parse(localStorage.getItem('currentUser')).currentUserId;
	const [followShipState, setFollowShipState] = useState({ userId: '', followShip: '' });
	const [isUserFollowerDataLoaded, setIsUserFollowerDataLoaded] = useState(false);

	const { id } = useParams();
	console.log('userId', id);

	const navigate = useNavigate();

	// 把使用者資訊拿出來用
	const {
		usersFollowersData,
		setUsersFollowersData,
		usersFollowingsData,
		setUsersFollowingsData,
		userData,
		setUserData,
		userTweetsData,
		setUserTweetsData,
	} = useUserData();

	// 查看此使用者ID追蹤中的人
	useEffect(() => {
		const fetchUserFollowingAsync = async () => {
			try {
				// 取得使用者資料
				const getUserDataData = await getUserData(id);
				setUserData(getUserDataData);
				console.log('getUserData', getUserDataData.name);

				// 取得使用者追蹤清單
				const getsUsersFollowingData = await getsUsersFollowing(id);
				setUsersFollowingsData(getsUsersFollowingData);
				console.log('getsUsersFollowing', getsUsersFollowingData);

				// 取得使用者所有推文
				const getUserTweetsData = await getUserTweets(id);
				setUserTweetsData(getUserTweetsData);
				console.log('getUserTweets', getUserTweetsData);

				// 取得使用者被跟隨清單
				const getUsersFollowersData = await getUsersFollowers(id);
				setUsersFollowersData(getUsersFollowersData);

				setIsUserFollowerDataLoaded(true);
			} catch (error) {
				console.log(error);
			}
		};
		fetchUserFollowingAsync();
	}, [id]);

	// 比對目前使用者有無跟隨跟隨者
	const comparedData = useMemo(() => {
		return usersFollowersData.map((follower) => {
			const isMatch = usersFollowingsData.some(
				(following) => follower.followerId === following.followingId,
			);

			if (isMatch) {
				return {
					...follower,
					matched: true,
				};
			} else {
				return follower;
			}
		});
	}, [usersFollowersData, usersFollowingsData]);

	const handleFollowClick = (id, followOrUnFollow) => {
		setIsUserFollowerDataLoaded(false);
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
					setIsUserFollowerDataLoaded(true);
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
					setIsUserFollowerDataLoaded(true);
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
			{isUserFollowerDataLoaded ? (
				<>
					<div className={style.followHeaderWrapper}>
						<Link to='/user/self'>
							<BackArrow className={style.backArrow} />
						</Link>
						<div className={style.followHeader}>
							<Header header={userData.name} className={style.header} />
							<a href='' className={style.tweets}>{`${userTweetsData.length}推文`}</a>
						</div>
					</div>
					<div className={style.followerListContainer}>
						<div className={style.followTabWrapper}>
							<div
								className={style.followerListTitle}
								onClick={() => navigate(`/user/${id}/follow`)}
							>
								追隨者
							</div>
							<div
								className={style.followingListTitle}
								onClick={() => navigate(`/user/${id}/following`)}
							>
								正在追隨
							</div>
						</div>
						<div className={style.userItemWrapper}>
							{comparedData.map((item) => {
								return (
									<UserItem
										key={item.Follower.id}
										id={item.Follower.id}
										name={item.Follower.name}
										avatar={item.Follower.avatar}
										description={item.Follower.introduction}
										isFollowing={item.matched}
										handleFollowClick={handleFollowClick}
									/>
								);
							})}
						</div>
					</div>
				</>
			) : (
				<h5>loading...</h5>
			)}
		</MainSection>
	);
};
