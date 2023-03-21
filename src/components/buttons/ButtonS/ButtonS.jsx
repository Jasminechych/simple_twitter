import style from 'src/components/buttons/ButtonS/ButtonS.module.scss';

export const ButtonS = ({ text }) => {
	return <button className={style.buttonS}>{text}</button>;
};
