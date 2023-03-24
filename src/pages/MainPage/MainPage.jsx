import { PopularListSection } from 'src/components/PopularListSection/PopularListSection';
import { Sidebar } from 'src/components/Sidebar/Sidebar';
import style from 'src/pages/MainPage/MainPage.module.scss';

export const MainPage = ({ children }) => {
	return (
		<div className={style.mainPageContainer}>
			<Sidebar />
			{children}
			<PopularListSection />
		</div>
	);
};
