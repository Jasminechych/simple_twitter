import style from 'src/components/buttons/ButtonM/ButtonM.module.scss';

export const ButtonM = ({ text, onClick }) => {
	return (
		<button
			className={style.buttonM}
			onClick={() => {
				onClick?.();
			}}
		>
			{text}
		</button>
	);
};
