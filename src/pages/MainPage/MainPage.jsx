import { useLocation } from 'react-router-dom';
import { PopularListSection } from 'src/components/PopularListSection/PopularListSection';
import { Sidebar } from 'src/components/Sidebar/Sidebar';
import style from 'src/pages/MainPage/MainPage.module.scss';
import { Outlet, useNavigate } from 'react-router-dom';

// import { getTopTenUsers, getsUsersFollowing } from 'src/apis/user';
// import { useEffect } from 'react';
// import { useState, useEffect, useCallback } from 'react';

// import { useUserData } from 'src/context/UserContext';

export const MainPage = () => {
	// 先驗證token，若無則直接回到login
	const token = localStorage.getItem('token');

	const navigate = useNavigate();
	if (!token) {
		navigate('/signin');
		return;
	}

	const location = useLocation();
	const currentPath = location.pathname;
	// console.log('currentPath', currentPath);

	// const currentUserId = JSON.parse(localStorage.getItem('currentUser')).currentUserId;
	// const [followShipState, setFollowShipState] = useState({ userId: '', followShip: '' });
	// const [isPopularListDataLoaded, setIsPopularListDataLoaded] = useState(false);
	// const {
	// 	topTenList,
	// 	setTopTenList,
	// 	usersFollowingsData,
	// 	setUsersFollowingsData,
	// 	isPopularListDataLoaded,
	// 	setIsPopularListDataLoaded,
	// } = useUserData();
	// const [mixData, setMixData] = useState([]);

	// useEffect(() => {
	// 	const fetchPopularListData = async () => {
	// 		try {
	// 			// 取得熱門清單 TOP 10
	// 			const topTenUsersData = await getTopTenUsers();
	// 			const topTen = topTenUsersData.data.usersData.slice(0, 10);
	// 			setTopTenList(topTen);

	// 			// 取得目前使用者 follow 清單
	// 			const userFollowingData = await getsUsersFollowing(currentUserId);
	// 			setUsersFollowingsData(userFollowingData);

	// 			setIsPopularListDataLoaded(true);
	// 		} catch (error) {
	// 			console.error(error);
	// 		}
	// 	};
	// 	fetchPopularListData();
	// }, [isPopularListDataLoaded, topTenList, usersFollowingsData]);

	return (
		<div className={style.mainPageContainer}>
			<Sidebar />
			{/* {children} */}
			<Outlet />
			{/* 測試用 */}
			{/* {isPopularListDataLoaded ? (
				currentPath !== '/setting' && <PopularListSection />
			) : (
				<h5>loading...</h5>
			)} */}
			{/* 原本的 */}
			{currentPath !== '/setting' && <PopularListSection />}
		</div>
	);
};
