import style from 'src/components/buttons/ButtonSetting/ButtonSetting.module.scss';

export const ButtonSetting = ({ text }) => {
	return <button className={style.ButtonSetting}>{text}</button>;
};
