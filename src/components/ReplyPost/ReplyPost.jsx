// ReplyPost
import { ReactComponent as Reply } from 'src/assets/icons/reply.svg';
import { ReactComponent as LikeFilled } from 'src/assets/icons/like-filled.svg';
import { ReactComponent as LikeOutline } from 'src/assets/icons/like-outline.svg';
import style from 'src/components/ReplyPost/ReplyPost.module.scss';

export const ReplyPost = () => {
	// 備用
	// {description, createdAt, replyCounts, likeCounts, account, name, avatar, isLikedByCurrentUser}
	return (
		<div className={style.replyPostContainer}>
			<div className={style.replyPostHeaderInfo}>
				<img className={style.replyPostAvatar} src='' />
				<div className={style.replyPostInfoGroup}>
					<p className={style.replyPostUserName}>Apple</p>
					<p className={style.replyPostUserAccount}>@apple123</p>
				</div>
			</div>

			<div className={style.replyPostDescription}>
				Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate
				exercitation incididunt aliquip deserunt.
			</div>

			<div className={style.replyPostCreateAt}>上午</div>

			<div className={style.replyPostFooterContainer}>
				<div className={style.replyPostCounterContainer}>
					<div className={style.replyPostCounterGroup}>
						<p className={style.replyPostCounterNum}>34</p>
						<p className={style.replyPostCounterText}>回覆</p>
					</div>

					<div className={style.replyPostCounterGroup}>
						<p className={style.replyPostCounterNum}>123</p>
						<p className={style.replyPostCounterText}>喜歡次數</p>
					</div>
				</div>

				<div className={style.replyPostButtonContainer}>
					<Reply />
					<LikeFilled />
					<LikeOutline />
					{/* {isLikedByCurrentUser ? <LikeFilled /> :  <LikeOutline />} */}
				</div>
			</div>
		</div>
	);
};
