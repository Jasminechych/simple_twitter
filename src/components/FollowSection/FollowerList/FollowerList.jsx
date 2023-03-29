import { Link } from 'react-router-dom';
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
} from 'src/apis/user';

export const FollowerList = ({ name, tweets }) => {
	const currentUserId = JSON.parse(localStorage.getItem('currentUser')).currentUserId;
	const [usersFollowersData, setUsersFollowersData] = useState([]);
	const [usersFollowingsData, setUsersFollowingsData] = useState([]);
	const [followShipState, setFollowShipState] = useState({ userId: '', followShip: '' });

	const [isDataLoaded, setIsDataLoaded] = useState(false);

	// 取得目前使用者的跟隨者
	useEffect(() => {
		const getUsersFollowersAsync = async () => {
			try {
				const followersData = await getUsersFollowers(currentUserId);
				setUsersFollowersData(followersData);
				const followingData = await getsUsersFollowing(currentUserId);
				setUsersFollowingsData(followingData);
				setIsDataLoaded(true);
			} catch (error) {
				console.log(error);
			}
		};
		getUsersFollowersAsync();
	}, []);

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
		setIsDataLoaded(false);
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
					setIsDataLoaded(true);
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
					setIsDataLoaded(true);
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
					<Header header={name} className={style.header} />
					<a href='' className={style.tweets}>{`${tweets}推文`}</a>
				</div>
			</div>
			<div className={style.followerListContainer}>
				<div className={style.followTabWrapper}>
					<div className={style.followerListTitle}>追隨者</div>
					<Link to='/following' className={style.followingListTitle}>
						正在追隨
					</Link>
				</div>
				<div className={style.userItemWrapper}>
					{isDataLoaded ? (
						comparedData.map((item) => {
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
						})
					) : (
						<h5>loading...</h5>
					)}
				</div>
			</div>
		</MainSection>
	);
};
