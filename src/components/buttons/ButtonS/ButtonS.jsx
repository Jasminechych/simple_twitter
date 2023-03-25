import style from 'src/components/buttons/ButtonS/ButtonS.module.scss';

export const ButtonS = ({ text, onClick, className }) => {
	return (
		<button className={`${className} ${style.buttonS}`} onClick={onClick}>
			{text}
		</button>
	);
};
