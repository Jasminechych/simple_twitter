import style from 'src/components/PopularListSection/PopularList.module.scss';
import { PopularListItem } from 'src/components/PopularListSection/PopularListItem';
import {
	getTopTenUsers,
	getsUsersFollowing,
	postFollowShips,
	deleteFollowShips,
} from 'src/apis/user';
import { useState, useEffect, useCallback } from 'react';
import { useUserData } from 'src/context/UserContext';

export const PopularList = () => {
	const currentUserId = JSON.parse(localStorage.getItem('currentUser')).currentUserId;
	const [followShipState, setFollowShipState] = useState({ userId: '', followShip: '' });
	const [isPopularListDataLoaded, setIsPopularListDataLoaded] = useState(false);
	const { topTenList, setTopTenList, usersFollowingsData, setUsersFollowingsData } = useUserData();
	const [mixData, setMixData] = useState([]);

	useEffect(() => {
		const fetchPopularListData = async () => {
			try {
				// 取得熱門清單 TOP 10
				const topTenUsersData = await getTopTenUsers();
				const topTen = topTenUsersData.data.usersData.slice(0, 10);
				setTopTenList(topTen);

				// 取得目前使用者 follow 清單
				const userFollowingData = await getsUsersFollowing(currentUserId);
				setUsersFollowingsData(userFollowingData);

				setIsPopularListDataLoaded(true);
			} catch (error) {
				console.error(error);
			}
		};
		fetchPopularListData();
	}, [isPopularListDataLoaded]);

	// 等有資料改
	const handleFollowClick = (id, followOrUnFollow) => {
		setIsPopularListDataLoaded(false);
		setFollowShipState({ userId: id, followShip: followOrUnFollow });
	};

	// 目前使用者 follow 清單比對 TOP 10 有無跟隨中
	// const mixData = useCallback(() => {
	// 	const mixData = topTenList.map((user) => {
	// 		const isMatch = usersFollowingsData.some((data) => data.followingId === user.id);

	// 		if (isMatch) {
	// 			return {
	// 				...user,
	// 				matched: true,
	// 			};
	// 		} else {
	// 			return user;
	// 		}
	// 	});
	// }, []);

	// 計算 mixData 的 callback function
	const calculateMixData = useCallback(() => {
		// 目前使用者 follow 清單比對 TOP 10 有無跟隨中
		const newMixData = topTenList.map((user) => {
			const isMatch = usersFollowingsData.some((data) => data.followingId === user.id);
			if (isMatch) {
				return {
					...user,
					matched: true,
				};
			} else {
				return user;
			}
		});
		return newMixData;
	}, [topTenList, usersFollowingsData]);

	useEffect(() => {
		if (isPopularListDataLoaded) {
			// 計算 mixData
			const newMixData = calculateMixData();
			setMixData(newMixData);
		}
	}, [isPopularListDataLoaded, calculateMixData]);

	// 追蹤追蹤或取消追蹤別人
	useEffect(() => {
		const followShipsAsync = async () => {
			if (followShipState.followShip === 'follow') {
				try {
					// 追蹤使用者
					await postFollowShips(followShipState.userId);

					// 取得熱門清單 TOP 10
					const topTenUsersData = await getTopTenUsers();
					const topTen = topTenUsersData.data.usersData.slice(0, 10);
					setTopTenList(topTen);

					// 重新取得目前使用者 follow 清單
					const userFollowingData = await getsUsersFollowing(currentUserId);
					setUsersFollowingsData(userFollowingData);

					setIsPopularListDataLoaded(true);
				} catch (error) {
					console.error(error);
				}
				return;
			}
			if (followShipState.followShip === 'unFollow') {
				try {
					// 取消追蹤使用者
					await deleteFollowShips(followShipState.userId);

					// 取得熱門清單 TOP 10
					const topTenUsersData = await getTopTenUsers();
					const topTen = topTenUsersData.data.usersData.slice(0, 10);
					setTopTenList(topTen);

					// 重新取得目前使用者 follow 清單
					const userFollowingData = await getsUsersFollowing(currentUserId);
					setUsersFollowingsData(userFollowingData);

					setIsPopularListDataLoaded(true);
				} catch (error) {
					console.error(error);
				}
				return;
			}
		};
		followShipsAsync();
	}, [followShipState]);

	return (
		<div className={style.popularListContainer}>
			{isPopularListDataLoaded ? (
				mixData.map(({ id, account, name, avatar, matched }) => {
					return (
						<PopularListItem
							key={id}
							id={id}
							name={name}
							avatar={avatar}
							account={account}
							isFollowing={matched}
							handleFollowClick={handleFollowClick}
						/>
					);
				})
			) : (
				<h5>loading...</h5>
			)}
		</div>
	);
};
