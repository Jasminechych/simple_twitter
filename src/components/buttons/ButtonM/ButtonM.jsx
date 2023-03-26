import style from 'src/components/buttons/ButtonM/ButtonM.module.scss';

export const ButtonM = ({ text, onSave }) => {
	return (
		<button
			className={style.buttonM}
			onClick={() => {
				onSave?.();
			}}
		>
			{text}
		</button>
	);
};
