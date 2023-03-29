import style from 'src/components/PopularListSection/PopularList.module.scss';
import { PopularListItem } from 'src/components/PopularListSection/PopularListItem';
import {
	getTopTenUsers,
	getFollowingsUsers,
	postFollowShips,
	deleteFollowShips,
} from 'src/apis/user';
import { useState, useEffect } from 'react';

export const PopularList = () => {
	const [topTenList, setTopTenList] = useState([]);
	const [currentUserFollowing, setCurrentUserFollowing] = useState([]);
	const currentUserId = JSON.parse(localStorage.getItem('currentUser')).currentUserId;
	const [followshipState, setFollowshipState] = useState({ userId: '', followship: '' });

	useEffect(() => {
		const getPopularListData = async () => {
			try {
				// 取得熱門清單 TOP 10
				const topTenUsersData = await getTopTenUsers();
				const topTen = topTenUsersData.data.usersData.slice(0, 10);
				setTopTenList(topTen);

				// 取得目前使用者 follow 清單
				const userFollowingData = await getFollowingsUsers(currentUserId);
				setCurrentUserFollowing(userFollowingData);
			} catch (error) {
				console.error(error);
			}
		};
		getPopularListData();
	}, []);

	// 等有資料改
	const handleFollowClick = (id, followOrUnFollow) => {
		setFollowshipState({ userId: id, followship: followOrUnFollow });
	};

	// 目前使用者 follow 清單比對 TOP 10 有無跟隨中
	const mixData = topTenList.map((user) => {
		const isMatch = currentUserFollowing.some((data) => data.followingId === user.id);

		if (isMatch) {
			return {
				...user,
				matched: true,
			};
		} else {
			return user;
		}
	});

	useEffect(() => {
		const postFollowShipsAsync = async () => {
			if (followshipState.followship === 'follow') {
				try {
					// 追蹤使用者
					await postFollowShips(followshipState.userId);

					// 取得熱門清單 TOP 10
					const topTenUsersData = await getTopTenUsers();
					const topTen = topTenUsersData.data.usersData.slice(0, 10);
					setTopTenList(topTen);

					// 重新取得目前使用者 follow 清單
					const userFollowingData = await getFollowingsUsers(currentUserId);
					setCurrentUserFollowing(userFollowingData);
				} catch (error) {
					console.error(error);
				}
				return;
			}
			if (followshipState.followship === 'unFollow') {
				try {
					// 取消追蹤使用者
					await deleteFollowShips(followshipState.userId);

					// 取得熱門清單 TOP 10
					const topTenUsersData = await getTopTenUsers();
					const topTen = topTenUsersData.data.usersData.slice(0, 10);
					setTopTenList(topTen);

					// 重新取得目前使用者 follow 清單
					const userFollowingData = await getFollowingsUsers(currentUserId);
					setCurrentUserFollowing(userFollowingData);
				} catch (error) {
					console.error(error);
				}
				return;
			}
		};
		postFollowShipsAsync();
	}, [followshipState]);

	return (
		<div className={style.popularListContainer}>
			{mixData.map(({ id, account, name, avatar, matched }) => {
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
			})}
		</div>
	);
};
