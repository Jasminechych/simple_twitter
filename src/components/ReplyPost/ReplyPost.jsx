import { ReactComponent as Reply } from 'src/assets/icons/reply.svg';
import { ReactComponent as LikeFilled } from 'src/assets/icons/like-filled.svg';
import { ReactComponent as LikeOutline } from 'src/assets/icons/like-outline.svg';
import style from 'src/components/ReplyPost/ReplyPost.module.scss';
import { formatDate } from 'src/utils/formatDate';
import { Link } from 'react-router-dom';

export const ReplyPost = ({
	id,
	avatar,
	name,
	account,
	description,
	createdAt,
	repliesCounts,
	likedCounts,
	isLikeByCurrentUser,
}) => {
	const createTime = formatDate(createdAt);
	return (
		<div className={style.replyPostContainer} id={id}>
			<div className={style.replyPostHeaderInfo}>
				<img className={style.replyPostAvatar} src={avatar} />
				<div className={style.replyPostInfoGroup}>
					<p className={style.replyPostUserName}>{name}</p>
					<p className={style.replyPostUserAccount}>@{account}</p>
				</div>
			</div>
			<div className={style.replyPostDescription}>{description}</div>
			<div className={style.replyPostCreateAt}>{createTime}</div>
			<div className={style.replyPostFooterContainer}>
				<div className={style.replyPostCounterContainer}>
					<div className={style.replyPostCounterGroup}>
						<p className={style.replyPostCounterNum}>{repliesCounts}</p>
						<p className={style.replyPostCounterText}>回覆</p>
					</div>

					<div className={style.replyPostCounterGroup}>
						<p className={style.replyPostCounterNum}>{likedCounts}</p>
						<p className={style.replyPostCounterText}>喜歡次數</p>
					</div>
				</div>

				<div className={style.replyPostButtonContainer}>
					<Link to='/replyList:id/modal'>
						<Reply />
					</Link>
					{isLikeByCurrentUse ? <LikeFilled /> : <LikeOutline />}
				</div>
			</div>
		</div>
	);
};
