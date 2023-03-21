import style from 'src/components/buttons/ButtonModal/ButtonModal.module.scss';

export const ButtonModal = ({ text }) => {
	return <button className={style.ButtonModal}>{text}</button>;
};
