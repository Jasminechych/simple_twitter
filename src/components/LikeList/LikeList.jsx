import { Link } from 'react-router-dom';
import style from 'src/components/LikeList/LikeList.module.scss';

export const LikeList = ({ handleTabChange }) => {
	return (
		<Link
			to='/user/self/tab=like'
			className={style.likeListContainer}
			onClick={() => handleTabChange('likeList')}
		>
			<div className={style.likeListTitle}>喜歡的內容</div>
		</Link>
	);
};
