import style from 'src/components/ReplyItem/ReplyItem.module.scss';
import { convertDateToHours } from 'src/utils/convertDateToHours';

export const ReplyItem = ({
	// tweetUserAccount,
	replyUserAccount,
	avatar,
	name,
	comment,
	createdAt,
}) => {
	const dateHour = convertDateToHours(createdAt);
	return (
		<div className={style.replyItemContainer}>
			<section className={style.replyItemAvatarSection}>
				<img className={style.replyItemAvatar} src={avatar} />
			</section>

			<section className={style.replyItemContentSection}>
				<div className={style.replyItemHeaderInfo}>
					<p className={style.replyItemUserName}>{name}</p>
					<p className={style.replyItemUserAccount}>
						@{replyUserAccount} • {dateHour}
					</p>
				</div>

				<div className={style.replyItemReplyGroup}>
					<p className={style.replyItemReply}>回覆</p>
					<p className={style.replyItemReplyAccount}>@Mitsubishi</p>
				</div>

				<p className={style.replyItemDescription}>{comment}</p>
			</section>
		</div>
	);
};
