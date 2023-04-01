import { useLocation } from 'react-router-dom';
import { PopularListSection } from 'src/components/PopularListSection/PopularListSection';
import { Sidebar } from 'src/components/Sidebar/Sidebar';
import style from 'src/pages/MainPage/MainPage.module.scss';
import { Outlet } from 'react-router-dom';
// import { useUserData } from 'src/context/UserContext';
// import { useEffect, useState } from 'react';
// import { getTopTenUsers, getsUsersFollowing } from 'src/apis/user';

export const MainPage = ({ children }) => {
	const location = useLocation();
	const currentPath = location.pathname;
	// console.log('currentPath', currentPath);

	// const currentUserId = JSON.parse(localStorage.getItem('currentUser')).currentUserId;

	// const { setTopTenList, setUsersFollowingsData } = useUserData();
	// const [isPopularListDataLoaded, setIsPopularListDataLoaded] = useState(false);

	// // console.log('main page loaded', isPopularListDataLoaded);

	// // 取得 popularList 的資料
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
	// 			console.log('userFollowingData', userFollowingData);

	// 			setIsPopularListDataLoaded(true);
	// 			console.log('main page get data');
	// 		} catch (error) {
	// 			console.error(error);
	// 		}
	// 	};
	// 	fetchPopularListData();
	// }, []);

	return (
		<div className={style.mainPageContainer}>
			<Sidebar />
			{children}
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
