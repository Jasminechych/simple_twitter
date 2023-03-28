import { Link } from 'react-router-dom';
import style from 'src/components/LikeList/LikeList.module.scss';

export const LikeList = ({ handleTabChange, className }) => {
	return (
		<Link
			to='/user/self/tab=like'
			className={`${className} ${style.likeListContainer}`}
			onClick={() => handleTabChange('likeList')}
		>
			<div className={style.likeListTitle}>喜歡的內容</div>
		</Link>
	);
};
