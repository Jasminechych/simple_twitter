import style from 'src/components/FollowSection/FollowingList/FollowingList.module.scss';
import { Header } from 'src/components/Header/Header';
import { MainSection } from 'src/components/MainSection/MainSection';
import { UserItem } from 'src/components/UserItem/UserItem';
import { ReactComponent as BackArrow } from 'src/assets/icons/back.svg';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {
	getsUsersFollowing,
	postFollowShips,
	deleteFollowShips,
	getUserData,
	getUserTweets,
} from 'src/apis/user';
import { useEffect, useState } from 'react';
import { useUserData } from 'src/context/UserContext';

export const FollowingList = () => {
	const currentUserId = JSON.parse(localStorage.getItem('currentUser')).currentUserId;
	// const [usersFollowingsData, setUsersFollowingsData] = useState([]);
	const [isUsersFollowingsDataLoaded, setUsersIsFollowingsDataLoaded] = useState(false);
	const [followShipState, setFollowShipState] = useState({ userId: '', followShip: '' });

	const { id } = useParams();
	console.log('userId', id);

	const navigate = useNavigate();

	// 把使用者資訊拿出來用
	const {
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

				// 取得使用者追蹤清單
				const getsUsersFollowingData = await getsUsersFollowing(id);
				setUsersFollowingsData(getsUsersFollowingData);

				// 取得使用者所有推文
				const getUserTweetsData = await getUserTweets(id);
				setUserTweetsData(getUserTweetsData);

				setUsersIsFollowingsDataLoaded(true);
			} catch (error) {
				console.log(error);
			}
		};
		fetchUserFollowingAsync();
	}, [id]);

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
			{isUsersFollowingsDataLoaded ? (
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
					<div className={style.followingListContainer}>
						<div className={style.followTabWrapper}>
							<div
								to='/follower'
								className={style.followerListTitle}
								onClick={() => navigate(`/user/${id}/follower`)}
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
							{usersFollowingsData.map(({ Following }) => {
								console.log('Following', Following);
								return (
									<UserItem
										key={Following.id}
										id={Following.id}
										name={Following.name}
										avatar={Following.avatar}
										description={Following.introduction}
										isFollowing='true'
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
