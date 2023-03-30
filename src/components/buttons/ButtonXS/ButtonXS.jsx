import style from 'src/components/buttons/ButtonXS/ButtonXS.module.scss';

export const ButtonXS = ({ text, onClick }) => {
	return (
		<button className={style.buttonXS} onClick={onClick}>
			{text}
		</button>
	);
};
