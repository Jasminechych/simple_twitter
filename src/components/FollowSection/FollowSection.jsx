import { useNavigate, useParams, useLocation } from 'react-router-dom';
import style from 'src/components/FollowSection/FollowSection.module.scss';
import { Header } from 'src/components/Header/Header';
import { MainSection } from 'src/components/MainSection/MainSection';
import { ReactComponent as BackArrow } from 'src/assets/icons/back.svg';
import { UserItem } from 'src/components/UserItem/UserItem';
import { useEffect, useState } from 'react';
import {
	getUsersFollowers,
	getsUsersFollowing,
	deleteFollowShips,
	postFollowShips,
	getUserData,
	getUserTweets,
} from 'src/apis/user';

export const FollowSection = () => {
	console.log('run FollowSection');
	// 目前登入使用者的 ID
	const currentUserId = JSON.parse(localStorage.getItem('currentUser')).currentUserId;
	// 目前登入使用者的 ID跟隨的人
	const [currentUserFollowingsData, setCurrentUserFollowingsData] = useState([]);

	// 要顯示的使用者的資料
	const [userData, setUserData] = useState({});
	// 要顯示的使用者的所有推文
	const [userTweetsData, setUserTweetsData] = useState([]);
	// 要顯示的使用者的跟隨者
	const [usersFollowersData, setUsersFollowersData] = useState([]);
	// 要顯示的使用者跟隨的人
	const [usersFollowingsData, setUsersFollowingsData] = useState([]);

	// // 設定資料都裝載完成
	const [isUserBasicDataLoaded, setIsUserBasicDataLoaded] = useState(false);
	const [isFetchFollowListDataLoaded, setIsFollowListDataLoaded] = useState(false);

	// 控制正在跟隨 & 跟隨按鈕點擊
	// const [followShipState, setFollowShipState] = useState({ userId: '', followShip: '' });
	const [isFollowShipClick, setIsFollowShipClick] = useState(false);

	// 要查看的使用者 ID
	const { id } = useParams();
	console.log('userId', id);

	// 取得現在路徑
	const { pathname } = useLocation();
	const lastParam = pathname.split('/')[3];

	// const [followState, setFollowState] = useState('');

	const navigate = useNavigate();

	const handleFollowClick = async (userId, followOrUnFollow) => {
		console.log('userId click 要', followOrUnFollow);
		setIsFollowListDataLoaded(false);
		try {
			if (followOrUnFollow === 'follow') {
				const followRes = await postFollowShips(userId);
				console.log('followRes', followRes);
				setIsFollowShipClick(!isFollowShipClick);
				// setIsFollowListDataLoaded(true);
				return;
			}
			if (followOrUnFollow === 'unFollow') {
				const UnFollowRes = await deleteFollowShips(userId);
				console.log('followRes', UnFollowRes);
				setIsFollowShipClick(!isFollowShipClick);
				// setIsFollowListDataLoaded(true);
				return;
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		const userBasicData = async () => {
			try {
				// 取得要查看的使用者資料
				const getUserDataData = await getUserData(id);
				setUserData(getUserDataData);
				// console.log('getUserDataData', getUserDataData);

				// 取得要查看的使用者所有推文
				const getUserTweetsData = await getUserTweets(id);
				setUserTweetsData(getUserTweetsData);
				// console.log('getUserTweets', getUserTweetsData);
				setIsUserBasicDataLoaded(true);
			} catch (error) {
				console.log(error);
			}
		};
		userBasicData();
	}, []);

	// 取得 FollowerList 資料
	useEffect(() => {
		const fetchUserFollowingAsync = async () => {
			try {
				// // 取得要查看的使用者資料
				// const getUserDataData = await getUserData(id);
				// setUserData(getUserDataData);
				// // console.log('getUserDataData', getUserDataData);

				// // 取得要查看的使用者所有推文
				// const getUserTweetsData = await getUserTweets(id);
				// setUserTweetsData(getUserTweetsData);
				// // console.log('getUserTweets', getUserTweetsData);

				// 取得目前登入的的使用者追蹤清單
				const getsCurrentUsersFollowingData = await getsUsersFollowing(currentUserId);
				setCurrentUserFollowingsData(getsCurrentUsersFollowingData);
				console.log('getsCurrentUsersFollowingData', getsCurrentUsersFollowingData);

				// 取得要查看的使用者的被跟隨清單
				if (lastParam === 'follower') {
					const getsUsersFollowerData = await getUsersFollowers(id);
					// 跟目前登入的使用者追蹤清單比對，如果資料相同 isFollowedByCurrentUser: true
					setUsersFollowersData(
						getsUsersFollowerData.map((user) => {
							const isFollowedByCurrentUser = currentUserFollowingsData.some(
								(data) => data.followingId === user.followerId,
							);
							if (isFollowedByCurrentUser) {
								return {
									...user,
									isFollowedByCurrentUser: true,
								};
							} else {
								return user;
							}
						}),
					);

					console.log('usersFollowersData', usersFollowersData);
					setIsFollowListDataLoaded(true);
					return;
				} else {
					// 取得要查看的使用者的跟隨清單
					const getsUsersFollowingData = await getsUsersFollowing(id);
					// 跟目前登入的使用者追蹤清單比對，如果資料相同 isFollowedByCurrentUser: true
					setUsersFollowingsData(
						getsUsersFollowingData.map((user) => {
							const isFollowedByCurrentUser = currentUserFollowingsData.some(
								(data) => data.followingId === user.followingId,
							);
							if (isFollowedByCurrentUser) {
								return {
									...user,
									isFollowedByCurrentUser: true,
								};
							} else {
								return user;
							}
						}),
					);
					console.log('usersFollowingsData', usersFollowingsData);
					setIsFollowListDataLoaded(true);
				}
			} catch (error) {
				console.log(error);
			}
		};
		fetchUserFollowingAsync();
	}, [id, isFetchFollowListDataLoaded, lastParam, handleFollowClick]);

	// 原本的
	// 點選追蹤或取消追蹤
	// const handleFollowClick = (id, followOrUnFollow) => {
	// 	setIsFollowListDataLoaded(false);
	// 	setFollowShipState((prevState) => {
	// 		return {
	// 			...prevState,
	// 			userId: id,
	// 			followShip: followOrUnFollow,
	// 		};
	// 	});
	// };

	// 原本的
	// 取消追蹤或追蹤某位使用者
	// useEffect(() => {
	// 	const followShipAsync = async () => {
	// 		if (followShipState.followShip === 'follow') {
	// 			try {
	// 				await postFollowShips(followShipState.userId);
	// 				const getsUsersFollowingData = await getsUsersFollowing(currentUserId);
	// 				setCurrentUserFollowingsData(getsUsersFollowingData);
	// 				setIsFollowListDataLoaded(true);
	// 				setIsFollowShipClick(!isFollowShipClick);
	// 			} catch (error) {
	// 				console.log(error);
	// 			}
	// 			return;
	// 		}
	// 		if (followShipState.followShip === 'unFollow') {
	// 			try {
	// 				await deleteFollowShips(followShipState.userId);
	// 				const getsUsersFollowingData = await getsUsersFollowing(currentUserId);
	// 				setCurrentUserFollowingsData(getsUsersFollowingData);
	// 				setIsFollowListDataLoaded(true);
	// 				setIsFollowShipClick(!isFollowShipClick);
	// 			} catch (error) {
	// 				console.log(error);
	// 			}
	// 			return;
	// 		}
	// 	};
	// 	followShipAsync();
	// }, [followShipState, isFollowShipClick]);

	return (
		<MainSection>
			{isUserBasicDataLoaded && isFetchFollowListDataLoaded ? (
				<>
					<div className={style.followHeaderWrapper}>
						<BackArrow className={style.backArrow} onClick={() => navigate(`/user/${id}`)} />
						<div className={style.followHeader}>
							<Header header={userData.name} className={style.header} />
							<a href='' className={style.tweets}>{`${userTweetsData.length}推文`}</a>
						</div>
					</div>
					<div className={style.followListContainer}>
						<div className={style.followTabWrapper}>
							<div
								className={
									lastParam === 'follower' ? style.followListActiveTitle : style.followListTitle
								}
								onClick={() => navigate(`/user/${id}/follower`)}
							>
								追隨者
							</div>
							<div
								className={
									lastParam === 'following' ? style.followListActiveTitle : style.followListTitle
								}
								onClick={() => navigate(`/user/${id}/following`)}
							>
								正在追隨
							</div>
						</div>
						<div className={style.userItemWrapper}>
							{lastParam === 'follower' &&
								usersFollowersData.map((item) => {
									return (
										<UserItem
											key={item.Follower.id}
											id={item.Follower.id}
											name={item.Follower.name}
											avatar={item.Follower.avatar}
											description={item.Follower.introduction || ''}
											isFollowing={item.isFollowedByCurrentUser}
											handleFollowClick={handleFollowClick}
										/>
									);
								})}
							{lastParam === 'following' &&
								usersFollowingsData.map((item) => {
									return (
										<UserItem
											key={item.Following.id}
											id={item.Following.id}
											name={item.Following.name}
											avatar={item.Following.avatar}
											description={item.Following.introduction || ''}
											isFollowing={item.isFollowedByCurrentUser}
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
