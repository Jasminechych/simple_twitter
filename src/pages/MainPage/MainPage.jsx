import { useLocation } from 'react-router-dom';
import { PopularListSection } from 'src/components/PopularListSection/PopularListSection';
import { Sidebar } from 'src/components/Sidebar/Sidebar';
import style from 'src/pages/MainPage/MainPage.module.scss';
import { Outlet, useNavigate } from 'react-router-dom';

// import { getTopTenUsers, getsUsersFollowing } from 'src/apis/user';
// import { useEffect } from 'react';
// import { useState, useEffect, useCallback } from 'react';

// import { useUserData } from 'src/context/UserContext';

export const MainPage = ({ children }) => {
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

	return (
		<div className={style.mainPageContainer}>
			<Sidebar />
			{children}
			<Outlet />
			{currentPath !== '/setting' && <PopularListSection />}
		</div>
	);
};
