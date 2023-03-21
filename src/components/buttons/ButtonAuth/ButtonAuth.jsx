import style from 'src/components/buttons/ButtonAuth/ButtonAuth.module.scss';

export const ButtonAuth = ({ text }) => {
	return <button className={style.buttonAuth}>{text}</button>;
};
