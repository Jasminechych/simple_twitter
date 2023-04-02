import style from 'src/components/ReplyItem/ReplyItem.module.scss';

export const ReplyItem = ({
	tweetUserAccount = '',
	replyUserAccount = '',
	avatar,
	name,
	comment,
	createdAt,
}) => {
	return (
		<div className={style.replyItemContainer}>
			<section className={style.replyItemAvatarSection}>
				<img className={style.replyItemAvatar} src={avatar} />
			</section>

			<section className={style.replyItemContentSection}>
				<div className={style.replyItemHeaderInfo}>
					<p className={style.replyItemUserName}>{name}</p>
					<p className={style.replyItemUserAccount}>
						@{replyUserAccount} • {createdAt}
					</p>
				</div>

				<div className={style.replyItemReplyGroup}>
					<p className={style.replyItemReply}>回覆</p>
					<p className={style.replyItemReplyAccount}>@{tweetUserAccount}</p>
				</div>

				<p className={style.replyItemDescription}>{comment}</p>
			</section>
		</div>
	);
};
