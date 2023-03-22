import style from 'src/components/buttons/ButtonS/ButtonS.module.scss';

export const ButtonS = ({ text, onClick }) => {
	return (
		<button className={style.buttonS} onClick={onClick}>
			{text}
		</button>
	);
};
