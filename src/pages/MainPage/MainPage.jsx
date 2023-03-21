import { MainSection } from 'src/components/MainSection/MainSection';
import { PopularListSection } from 'src/components/PopularListSection/PopularListSection';
import { Sidebar } from 'src/components/Sidebar/Sidebar';
import style from 'src/pages/MainPage/MainPage.module.scss';

export const MainPage = () => {
	return (
		<div className={style.mainPageContainer}>
			<Sidebar />
			<MainSection />
			<PopularListSection />
		</div>
	);
};
