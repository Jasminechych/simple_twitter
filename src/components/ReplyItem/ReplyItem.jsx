import style from 'src/components/ReplyItem/ReplyItem.module.scss';

export const ReplyItem = ({ description, createdAt, account, name, avatar }) => {
	return (
		<div className={style.replyItemContainer}>
			<section className={style.replyItemAvatarSection}>
				<img className={style.replyItemAvatar} src={avatar} />
			</section>

			<section className={style.replyItemContentSection}>
				<div className={style.replyItemHeaderInfo}>
					<p className={style.replyItemUserName}>{name}</p>
					<p className={style.replyItemUserAccount}>
						@{account}・{createdAt} 小時
					</p>
				</div>

				<div className={style.replyItemReplyGroup}>
					<p className={style.replyItemReply}>回覆</p>
					<p className={style.replyItemReplyAccount}>@這個account還不確定拿什麼資料</p>
				</div>

				<p className={style.replyItemDescription}>{description}</p>
			</section>
		</div>
	);
};
