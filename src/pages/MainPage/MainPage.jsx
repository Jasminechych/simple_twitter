import { useLocation } from 'react-router-dom';
import { PopularListSection } from 'src/components/PopularListSection/PopularListSection';
import { Sidebar } from 'src/components/Sidebar/Sidebar';
import style from 'src/pages/MainPage/MainPage.module.scss';

export const MainPage = ({ children }) => {
	const location = useLocation();
	const currentPath = location.pathname;
	console.log('currentPath', currentPath);
	return (
		<div className={style.mainPageContainer}>
			<Sidebar />
			{children}
			{currentPath !== '/setting' && <PopularListSection />}
		</div>
	);
};
