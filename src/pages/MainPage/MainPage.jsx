import { useLocation } from 'react-router-dom';
import { PopularListSection } from 'src/components/PopularListSection/PopularListSection';
import { Sidebar } from 'src/components/Sidebar/Sidebar';
import style from 'src/pages/MainPage/MainPage.module.scss';
import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const MainPage = ({ children }) => {
	const navigate = useNavigate();
	// 先驗證token，若無則直接回到login
	const token = localStorage.getItem('token');

	useEffect(() => {
		if (!token) {
			navigate('/signin');
			return;
		}
	}, [token]);

	// 目前頁面路徑
	const location = useLocation();
	const currentPath = location.pathname;

	return (
		<div className={style.mainPageContainer}>
			<Sidebar />
			{children}
			<Outlet />
			{currentPath !== '/setting' && <PopularListSection />}
		</div>
	);
};
