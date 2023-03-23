import style from 'src/components/MainSection/MainSection.module.scss';

export const MainSection = ({ children }) => {
	return <div className={style.mainSectionContainer}>{children}</div>;
};
