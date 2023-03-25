import style from 'src/components/buttons/ButtonXL/ButtonXL.module.scss';

export const ButtonXL = ({ text, onClick }) => {
	return (
		<button className={style.buttonXL} onClick={onClick}>
			{text}
		</button>
	);
};
