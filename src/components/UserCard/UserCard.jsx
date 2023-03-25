import style from 'src/components/UserCard/UserCard.module.scss';
import { ReactComponent as Post } from 'src/assets/icons/post.svg';
import { ReactComponent as LikeOutLine } from 'src/assets/icons/like-outline.svg';

export const UserCard = ({
	id,
	account,
	name,
	avatar,
	cover,
	tweetsCounts,
	followingCounts,
	followerCounts,
	likedCounts,
}) => {
	return (
		<div className={style.cardContainer} id={id}>
			<div className={style.cardBackgroundSection}>
				<img className={style.userBackgroundImg} src={cover} alt='userBackgroundImg' />
			</div>
			<img className={style.userAvatar} src={avatar} alt='userAvatar' />
			<div className={style.userInfoSection}>
				<p className={style.userName}>{name}</p>
				<p className={style.userAccount}>@{account}</p>
				<div className={style.userTweetAndLikeCounterContainer}>
					<div className={style.counterWrapper}>
						<Post />
						<p className={style.counterText}>{tweetsCounts}</p>
					</div>
					<div className={style.counterWrapper}>
						<LikeOutLine />
						<p className={style.counterText}>{likedCounts}</p>
					</div>
				</div>
				<div className={style.userFollowContainer}>
					<div className={style.followWrapper}>
						<p className={style.followCounter}>{followingCounts} 個</p>
						<p className={style.followText}>跟隨中</p>
					</div>
					<div className={style.followWrapper}>
						<p className={style.followCounter}>{followerCounts} 位</p>
						<p className={style.followText}>跟隨者</p>
					</div>
				</div>
			</div>
		</div>
	);
};
