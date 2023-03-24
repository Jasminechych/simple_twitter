import { Link } from 'react-router-dom';
import style from 'src/components/ReplyListTab/ReplyListTab.module.scss';

export const ReplyListTab = ({ handleTabChange, isSelected }) => {
	return (
		<Link
			to='/user/self/tab=reply'
			className={style.replyListTabContainer}
			onClick={() => handleTabChange('replyPost')}
		>
			<div className={`${style.replyListTabTitle} ${isSelected ? style.active : ''}`}>回覆</div>
		</Link>
	);
};
