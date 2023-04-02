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

	// 全站排名前十被追蹤清單
	const [topTenList, setTopTenList] = useState([]);

	// 控制正在跟隨 & 跟隨按鈕點擊
	const [isFollowClick, setIsFollowClick] = useState(false);

	// 控制資料載入完成
	const [isPopularListDataLoaded, setIsPopularListDataLoaded] = useState(false);

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
				// 取得目前使用者 follow 清單
				const userFollowingData = await getsUsersFollowing(currentUserId);
				console.log('執行拉完資料');

				setTopTenList(
					topTen.map((user) => {
						const isMatch = userFollowingData.some((data) => data.followingId === user.id);
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
	}, [isFollowClick]);

	// 追蹤追蹤或取消追蹤別人
	const handleFollowClick = async (userId, followOrUnFollow) => {
		console.log('執行 handleFollowClick');

		setIsPopularListDataLoaded(false);
		if (followOrUnFollow === 'follow') {
			try {
				// 追蹤使用者
				await postFollowShips(userId);
				setIsPopularListDataLoaded(true);
				setIsFollowClick(!isFollowClick);
			} catch (error) {
				console.error(error);
			}
			return;
		} else {
			try {
				// 取消追蹤使用者
				await deleteFollowShips(userId);
				setIsPopularListDataLoaded(true);
				setIsFollowClick(!isFollowClick);
			} catch (error) {
				console.error(error);
			}
			return;
		}
	};

	return (
		<div className={style.popularListContainer}>
			{isPopularListDataLoaded ? (
				topTenList.map(({ id, account, name, avatar, matched }) => {
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
