// ReplyItem

import style from 'src/components/ReplyItem/ReplyItem.module.scss';

export const ReplyItem = () => {
	// 備用
	//   {
	// 	description,
	// 	avatar,
	// 	userName,
	// 	userAccount,
	// 	tweetItemHeaderButton,
	// 	replyCounts,
	// 	likeCounts,
	// 	isLiked,
	// }
	return (
		<div className={style.replyItemContainer}>
			<section className={style.replyItemAvatarSection}>
				<img className={style.replyItemAvatar} src='' />
			</section>

			<section className={style.replyItemContentSection}>
				<div className={style.replyItemHeaderInfo}>
					<p className={style.replyItemUserName}>Apple</p>
					<p className={style.replyItemUserAccount}>@apple・3 小時</p>
				</div>

				<div className={style.replyItemReplyGroup}>
					<p className={style.replyItemReply}>回覆</p>
					<p className={style.replyItemReplyAccount}>@apple</p>
				</div>

				<p className={style.replyItemDescription}>
					former apple engineer shares a simple DIY fix to seal your surgical mask
				</p>
			</section>
		</div>
	);
};
