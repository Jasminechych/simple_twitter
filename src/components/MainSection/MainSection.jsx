import style from 'src/components/MainSection/MainSection.module.scss';
import { Header } from 'src/components/Header/Header';

export const MainSection = ({ header, children }) => {
	return (
		<div className={style.mainSectionContainer}>
			<Header header={header} />
			{children}
		</div>
	);
};
