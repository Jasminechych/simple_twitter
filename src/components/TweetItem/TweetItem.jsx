import { ReactComponent as Reply } from 'src/assets/icons/reply.svg';
import { ReactComponent as LikeFilled } from 'src/assets/icons/like-filled.svg';
import { ReactComponent as LikeOutline } from 'src/assets/icons/like-outline.svg';
import { useNavigate, Link } from 'react-router-dom';
import style from 'src/components/TweetItem/TweetItem.module.scss';
import { useUserData } from 'src/context/UserContext';

export const TweetItem = ({
	id,
	description,
	avatar,
	name,
	account,
	createdAt,
	replyCounts,
	likeCounts,
	isLikeByUser,
	handleHeartClick,
}) => {
	const { setIsShownUserInfo } = useUserData();
	const navigate = useNavigate();

	// 點擊推文導向 replyList 頁面
	const handleTweetClick = (id) => {
		navigate(`/reply_list/${id}`);
	};

	const handleAvatarClick = (id) => {
		console.log('avatar click id: ', id);
		setIsShownUserInfo(id);
		navigate(`/user/${id}`);
	};

	return (
		<div className={style.tweetItemContainer} id={id}>
			<section className={style.tweetItemAvatarSection}>
				<img className={style.tweetItemAvatar} src={avatar} onClick={() => handleAvatarClick(id)} />
			</section>

			<section className={style.tweetItemContentSection}>
				<div className={style.tweetItemHeaderInfo}>
					<p className={style.tweetItemUserName}>{name}</p>
					<p className={style.tweetItemUserAccount}>
						@{account} • {createdAt}
					</p>
				</div>

				<p className={style.tweetItemDescription} onClick={() => handleTweetClick(id)}>
					{description}
				</p>

				<div className={style.tweetItemFooter}>
					<div className={style.tweetItemButtonGroup}>
						{/* 測試用 */}
						<Link
							to={{
								pathname: `/replyList:${id}/modal`,
								search: `id=${id}&name=${name}&account=${account}&createdAt=${createdAt}&avatar=${avatar}&description=${encodeURIComponent(
									description,
								)}`,
							}}
						>
							<Reply style={{ width: '13.7px', height: '13.7px' }} />
						</Link>

						{/* 下面是原本的 */}
						{/* <Reply style={{ width: '13.7px', height: '13.7px' }} /> */}
						<p className={style.tweetItemCounter}>{replyCounts}</p>
					</div>
					<div className={style.tweetItemButtonGroup}>
						{isLikeByUser ? (
							<LikeFilled
								style={{ width: '13.7px', height: '13.7px' }}
								onClick={() => handleHeartClick(id, 'unLike')}
							/>
						) : (
							<LikeOutline
								style={{ width: '13.7px', height: '13.7px' }}
								onClick={() => handleHeartClick(id, 'like')}
							/>
						)}
						<p className={style.tweetItemCounter}>{likeCounts}</p>
					</div>
				</div>
			</section>
		</div>
	);
};
