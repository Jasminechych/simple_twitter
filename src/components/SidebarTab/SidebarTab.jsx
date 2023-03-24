import { Link } from 'react-router-dom';
import style from 'src/components/SidebarTab/SidebarTab.module.scss';

export const SidebarTab = ({ path, text, icon, isActiveText = '' }) => {
	return (
		<Link to={path} className={style.tabGroup}>
			{icon}
			<h5 className={isActiveText ? style.activeText : ''}>{text}</h5>
		</Link>
	);
};
