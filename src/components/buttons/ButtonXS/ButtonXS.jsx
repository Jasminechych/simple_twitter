import style from 'src/components/buttons/ButtonXS/ButtonXS.module.scss';

export const ButtonXS = ({ text }) => {
	return <button className={style.buttonXS}>{text}</button>;
};
