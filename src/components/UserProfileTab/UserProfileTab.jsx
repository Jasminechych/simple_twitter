import style from 'src/components/UserProfileTab/UserProfileTab.module.scss';

export const UserProfileTab = ({ title, handleTabChange, className }) => {
	return (
		<div
			className={`${className} ${style.tweetListTabContainer}`}
			onClick={() => handleTabChange('tweetList')}
		>
			<div className={style.tweetListTabTitle}>{title}</div>
		</div>
	);
};
