import { Link } from 'react-router-dom';
import style from 'src/components/TweetListTab/TweetListTab.module.scss';

export const TweetListTab = ({ handleTabChange, className }) => {
	return (
		<Link
			to='/user/self/tab=tweet'
			className={`${className} ${style.tweetListTabContainer}`}
			onClick={() => handleTabChange('tweetList')}
		>
			<div className={style.tweetListTabTitle}>推文</div>
		</Link>
	);
};
