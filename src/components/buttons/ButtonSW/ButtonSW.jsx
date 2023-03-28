import { Link } from 'react-router-dom';
import style from 'src/components/buttons/ButtonSW/ButtonSW.module.scss';

export const ButtonSW = ({ text, onClick, path }) => {
	return (
		<Link to={path}>
			<button className={style.buttonSW} onClick={onClick}>
				{text}
			</button>
		</Link>
	);
};
