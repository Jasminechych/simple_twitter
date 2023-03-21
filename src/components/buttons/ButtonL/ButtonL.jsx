import style from 'src/components/buttons/ButtonL/ButtonL.module.scss';

export const ButtonL = ({ text }) => {
	return <button className={style.buttonL}>{text}</button>;
};
