import style from 'src/components/buttons/ButtonSW/ButtonSW.module.scss';

export const ButtonSW = ({ text }) => {
	return <button className={style.ButtonSW}>{text}</button>;
};
