import style from 'src/components/PopularListSection/PopularList.module.scss';
import { PopularListItem } from 'src/components/PopularListSection/PopularListItem';
import { getTopTenUsers, getFollowingsUsers } from 'src/apis/user';
import { useState, useEffect } from 'react';

export const PopularList = () => {
	const [topTenList, setTopTenList] = useState([]);

	useEffect(() => {
		const getTopTenUsersAsync = async () => {
			try {
				const data = await getTopTenUsers();
				// console.log('頁面的data.data.usersData: ', data.data.usersData);

				if (data.data.usersData.length > 0) {
					// console.log('data.data.usersData:', data.data.usersData);
					const topTen = data.data.usersData.slice(0, 10);
					// console.log('topTen:', topTen);
					setTopTenList(topTen);
				}
			} catch (error) {
				console.error(error);
			}
		};
		getTopTenUsersAsync();
	}, []);

	// 缺使用者跟隨資料比對 TOP 10 有無跟隨中
	useEffect(() => {
		const getFollowingsUsersAsync = async () => {
			const currentUserId = JSON.parse(localStorage.getItem('currentUser'));
			console.log('currentUserId: ', currentUserId.currentUserId);
			try {
				const data = await getFollowingsUsers(currentUserId);
				console.log('user following data: ', data);
			} catch (error) {
				console.error(error);
			}
		};
		getFollowingsUsersAsync();
	}, []);

	return (
		<div className={style.popularListContainer}>
			{topTenList.map(({ id, account, name, avatar }) => {
				return (
					<PopularListItem
						key={id}
						id={id}
						name={name}
						avatar={avatar}
						account={account}
						// initIsFollowing={isFollowing}
					/>
				);
			})}
		</div>
	);
};
