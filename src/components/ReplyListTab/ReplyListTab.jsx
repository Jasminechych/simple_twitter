import { Link } from 'react-router-dom';
import style from 'src/components/ReplyListTab/ReplyListTab.module.scss';

export const ReplyListTab = ({ handleTabChange, className }) => {
	return (
		<Link
			to='/user/self/tab=reply'
			className={`${className} ${style.replyListTabContainer}`}
			onClick={() => handleTabChange('replyPost')}
		>
			<div className={style.replyListTabTitle}>回覆</div>
		</Link>
	);
};
