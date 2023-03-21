import style from 'src/components/buttons/ButtonProfile/ButtonProfile.module.scss';

export const ButtonProfile = ({ text }) => {
	return <button className={style.ButtonProfile}>{text}</button>;
};
