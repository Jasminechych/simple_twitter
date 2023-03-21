import style from 'src/components/Header/Header.module.scss';

export const Header = ({ header }) => {
	return <h4 className={style.mainHeader}>{header}</h4>;
};
