import style from 'src/components/buttons/ButtonXL/ButtonXL.module.scss';

export const ButtonXL = ({ text }) => {
	return <button className={style.buttonXL}>{text}</button>;
};
