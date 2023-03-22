import style from 'src/components/buttons/ButtonSW/ButtonSW.module.scss';

export const ButtonSW = ({ text, onClick }) => {
	return (
		<button className={style.buttonSW} onClick={onClick}>
			{text}
		</button>
	);
};
