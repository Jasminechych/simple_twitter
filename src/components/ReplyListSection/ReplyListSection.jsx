import { ReplyPost } from 'src/components/ReplyPost/ReplyPost';
import { Back } from 'src/assets/icons/index';
import style from 'src/components/ReplyListSection/ReplyListSection.module.scss';
import { getOneTweet, getTweetReplies, postLikeTweet, postUnLikeTweet } from 'src/apis/user';
import { useState, useEffect, useCallback } from 'react';
import { ReplyItem } from 'src/components/ReplyItem/ReplyItem';
import { useNavigate, useParams } from 'react-router-dom';
import { convertDateToHours } from 'src/utils/convertDateToHours';

export const ReplyListSection = () => {
	const [replyPostData, setReplyPostData] = useState({});
	const [tweetRepliesData, setTweetRepliesData] = useState([]);
	const [isFetchReplyListSectionData, setIsFetchReplyListSectionData] = useState(false);
	// 控制點愛心 & 取消愛心點擊
	const [isLikingOrUnLiking, setIsLikingOrUnLiking] = useState({ id: '', likeOrUnlike: '' });
	const [isHeartClick, setIsHeartClick] = useState(false);

	const navigate = useNavigate();

	// 取的目前頁面的推文id
	const { id } = useParams();

	// 取得單篇推文資料
	useEffect(() => {
		const fetchReplyListSectionDataAsync = async () => {
			try {
				// 取得一篇推文
				const getOneTweetData = await getOneTweet(id);
				setReplyPostData(getOneTweetData);

				// 找出此貼文 ID 的所有回復
				const getTweetRepliesData = await getTweetReplies(id);
				setTweetRepliesData(getTweetRepliesData);

				setIsFetchReplyListSectionData(true);
			} catch (error) {
				console.error(error);
			}
		};
		fetchReplyListSectionDataAsync();
	}, [isHeartClick]);

	// 對貼文按愛心或取消愛心
	const handleHeartClick = useCallback((id, likeOrUnlike) => {
		setIsFetchReplyListSectionData(false);

		setIsLikingOrUnLiking((prev) => {
			return { ...prev, id: id, likeOrUnlike: likeOrUnlike };
		});
	}, []);

	useEffect(() => {
		const postLikeOrUnlikeTweetAsync = async () => {
			try {
				// 按愛心
				if (isLikingOrUnLiking.id !== '') {
					if (isLikingOrUnLiking.likeOrUnlike === 'like') {
						await postLikeTweet(isLikingOrUnLiking.id);
						setIsHeartClick(!isHeartClick);
						return;
					} else {
						// 取消愛心
						await postUnLikeTweet(isLikingOrUnLiking.id);
						setIsHeartClick(!isHeartClick);
					}
				}
			} catch (error) {
				console.error(error);
			}
		};
		postLikeOrUnlikeTweetAsync();
	}, [isLikingOrUnLiking]);

	const handleGoBackClick = () => {
		navigate(-1);
	};

	return (
		<div>
			<div className={style.replyListSectionHeader}>
				<Back style={{ cursor: 'pointer' }} onClick={handleGoBackClick} />
				<h4>推文</h4>
			</div>

			{isFetchReplyListSectionData ? (
				<ReplyPost
					id={replyPostData.id}
					description={replyPostData.description}
					likedCounts={replyPostData.LikedCounts}
					repliesCounts={replyPostData.RepliesCounts}
					account={replyPostData.User.account}
					avatar={replyPostData.User.avatar}
					name={replyPostData.User.name}
					createdAt={replyPostData.createdAt}
					isLikeByCurrentUser={replyPostData.isLiked}
					handleHeartClick={handleHeartClick}
				/>
			) : (
				<h5>loading...</h5>
			)}

			{tweetRepliesData.map(({ Tweet, id, User, comment, createdAt }) => {
				const createTime = convertDateToHours(createdAt);
				return (
					<ReplyItem
						key={id}
						tweetUserAccount={Tweet.User.account}
						replyUserAccount={User.account}
						avatar={User.avatar}
						name={User.name}
						comment={comment}
						createdAt={createTime}
					/>
				);
			})}
		</div>
	);
};
