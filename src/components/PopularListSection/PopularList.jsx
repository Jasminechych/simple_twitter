import style from 'src/components/PopularListSection/PopularList.module.scss';
import { PopularListItem } from 'src/components/PopularListSection/PopularListItem';
import { getTopTenUsers, getFollowingsUsers, postFollowShips } from 'src/apis/user';

import { useState, useEffect } from 'react';

export const PopularList = () => {
	const [topTenList, setTopTenList] = useState([]);
	const [currentUserFollowing, setCurrentUserFollowing] = useState([]);

	useEffect(() => {
		const getTopTenUsersAsync = async () => {
			try {
				const data = await getTopTenUsers();

				if (data.data.usersData.length > 0) {
					const topTen = data.data.usersData.slice(0, 10);
					setTopTenList(topTen);
				}
			} catch (error) {
				console.error(error);
			}
		};
		getTopTenUsersAsync();
	}, []);

	// 使用者跟隨資料比對 TOP 10 有無跟隨中
	useEffect(() => {
		const getFollowingsUsersAsync = async () => {
			const currentUserId = JSON.parse(localStorage.getItem('currentUser'));
			// console.log('currentUserId: ', currentUserId.currentUserId);
			try {
				const data = await getFollowingsUsers(currentUserId.currentUserId);
				setCurrentUserFollowing(data);
			} catch (error) {
				console.error(error);
			}
		};
		getFollowingsUsersAsync();
	}, []);

	// 取得 TOP 10 支當前使用者有 follow 的名單
	const matchingList = topTenList.map((user) => {
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

	// 等有資料改
	const handleFollowClick = (id) => {
		console.log('click', id);
		postFollowShips(id);
		// getFollowingsUsersAsync();
		// getTopTenUsersAsync();
	};

	return (
		<div className={style.popularListContainer}>
			{matchingList.map(({ id, account, name, avatar, matched }) => {
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
