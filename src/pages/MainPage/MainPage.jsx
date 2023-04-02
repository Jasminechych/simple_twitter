import { useLocation } from 'react-router-dom';
import { PopularListSection } from 'src/components/PopularListSection/PopularListSection';
import { Sidebar } from 'src/components/Sidebar/Sidebar';
import style from 'src/pages/MainPage/MainPage.module.scss';
import { Outlet } from 'react-router-dom';

export const MainPage = ({ children }) => {
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
