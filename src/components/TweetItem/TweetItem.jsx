import { ReactComponent as Reply } from 'src/assets/icons/reply.svg';
import { ReactComponent as LikeFilled } from 'src/assets/icons/like-filled.svg';
import { ReactComponent as LikeOutline } from 'src/assets/icons/like-outline.svg';

import style from 'src/components/TweetItem/TweetItem.module.scss';

export const TweetItem = ({
	id,
	description,
	avatar,
	userName,
	userAccount,
	createdAt,
	replyCounts,
	likeCounts,
	isLiked,
}) => {
	return (
		<div className={style.tweetItemContainer} id={id}>
			<section className={style.tweetItemAvatarSection}>
				<img className={style.tweetItemAvatar} src={avatar} />
			</section>

			<section className={style.tweetItemContentSection}>
				<div className={style.tweetItemHeaderInfo}>
					<p className={style.tweetItemUserName}>{userName}</p>
					<p className={style.tweetItemUserAccount}>
						@{userAccount}・{createdAt} 小時
					</p>
				</div>

				<p className={style.tweetItemDescription}>{description}</p>

				<div className={style.tweetItemFooter}>
					<div className={style.tweetItemButtonGroup}>
						<Reply style={{ width: '13.7px', height: '13.7px' }} />
						<p>{replyCounts}</p>
					</div>
					<div className={style.tweetItemButtonGroup}>
						{isLiked === 'true' ? (
							<LikeFilled style={{ width: '13.7px', height: '13.7px' }} />
						) : (
							<LikeOutline style={{ width: '13.7px', height: '13.7px' }} />
						)}
						<p>{likeCounts}</p>
					</div>
				</div>
			</section>
		</div>
	);
};
