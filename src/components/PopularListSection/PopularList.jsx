import style from 'src/components/PopularListSection/PopularList.module.scss';
import { PopularListItem } from 'src/components/PopularListSection/PopularListItem';
import {
	getTopTenUsers,
	getsUsersFollowing,
	postFollowShips,
	deleteFollowShips,
} from 'src/apis/user';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loading } from 'src/assets/icons';

export const PopularList = () => {
	console.log('popular list work');
	// 目前登入使用者 ID
	const currentUserId = JSON.parse(localStorage.getItem('currentUser')).currentUserId;
	// 使用者跟隨的人
	const [usersFollowingsData, setUsersFollowingsData] = useState([]);

	// 全站排名前十被追蹤清單
	const [topTenList, setTopTenList] = useState([]);

	// 控制正在跟隨 & 跟隨按鈕點擊
	const [followShipState, setFollowShipState] = useState({ userId: '', followShip: '' });

	// 控制資料載入完成
	const [isPopularListDataLoaded, setIsPopularListDataLoaded] = useState(false);

	// 比對全站排名前十被追蹤清單 & 使用者跟隨的人
	const [mixData, setMixData] = useState([]);

	const navigate = useNavigate();

	useEffect(() => {
		const fetchPopularListData = async () => {
			// 先驗證token，若無則直接回到signin
			const token = localStorage.getItem('token');
			if (!token) {
				navigate('signin');
				return;
			}

			try {
				// 取得熱門清單 TOP 10
				const topTenUsersData = await getTopTenUsers();
				const topTen = topTenUsersData.data.usersData.slice(0, 10);
				setTopTenList(topTen);

				// 取得目前使用者 follow 清單
				const userFollowingData = await getsUsersFollowing(currentUserId);
				setUsersFollowingsData(userFollowingData);

				setMixData(
					topTenList.map((user) => {
						const isMatch = usersFollowingsData.some((data) => data.followingId === user.id);
						if (isMatch) {
							return {
								...user,
								matched: true,
							};
						} else {
							return user;
						}
					}),
				);

				setIsPopularListDataLoaded(true);
			} catch (error) {
				console.error(error);
			}
		};
		fetchPopularListData();
	}, [isPopularListDataLoaded, followShipState]);

	// 追蹤追蹤或取消追蹤別人
	const handleFollowClick = (id, followOrUnFollow) => {
		setIsPopularListDataLoaded(false);
		setFollowShipState((prevState) => {
			return {
				...prevState,
				userId: id,
				followShip: followOrUnFollow,
			};
		});
	};

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
				<Loading />
			)}
		</div>
	);
};
