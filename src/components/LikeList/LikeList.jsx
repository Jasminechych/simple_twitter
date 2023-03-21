import style from 'src/components/LikeList/LikeList.module.scss';

export const LikeList = () => {
	return (
		<div className={style.likeListContainer}>
			<div className={style.likeListTitle}>喜歡的內容</div>
			<div className={style.likeListTweets}>LikeTweets</div>
		</div>
	);
};
