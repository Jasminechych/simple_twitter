import style from 'src/components/Header/Header.module.scss';

export const Header = ({ header, className }) => {
	return <h4 className={`${className} ${style.mainHeader}`}>{header}</h4>;
};
