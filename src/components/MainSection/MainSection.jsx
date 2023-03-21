import style from 'src/components/MainSection/MainSection.module.scss';
import { Header } from 'src/components/Header/Header';

export const MainSection = () => {
	return (
		<div className={style.mainSectionContainer}>
			<Header header='首頁' />
		</div>
	);
};
