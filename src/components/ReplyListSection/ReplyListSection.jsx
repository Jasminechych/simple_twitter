import { ReplyPost } from 'src/components/ReplyPost/ReplyPost';
// import { ReplyList } from 'src/components/ReplyList/ReplyList';
import { Back } from 'src/assets/icons/index';
import style from 'src/components/ReplyListSection/ReplyListSection.module.scss';
import { getOneTweet, getTweetReplies } from 'src/apis/user';
import { useState, useEffect } from 'react';
import { ReplyItem } from 'src/components/ReplyItem/ReplyItem';

export const ReplyListSection = () => {
	const [replyPostData, setReplyPostData] = useState({});
	const [tweetRepliesData, setTweetRepliesData] = useState([]);
	// const [currentUserLikeTweetsData, setCurrentUserLikeTweetsData] = useState([]);
	// const currentUserId = JSON.parse(localStorage.getItem('currentUser')).currentUserId;

	// 取得單篇推文資料
	useEffect(() => {
		const getOneTweetAsync = async () => {
			try {
				// id 待替換
				const data = await getOneTweet(174);
				setReplyPostData(data);
				console.warn('getOneTweet data: ', data);
			} catch (error) {
				console.error(error);
			}
		};
		getOneTweetAsync();
	}, []);

	// 取得目前使用者喜歡過的推文資料
	// 待確認有沒有要做比對愛心
	// useEffect(() => {
	// 	const getUserLikesAsync = async () => {
	// 		try {
	// 			const data = await getUserLikes(currentUserId);
	// 			setCurrentUserLikeTweetsData(data);
	// 			console.warn('getUserLikes data: ', data);
	// 		} catch (error) {
	// 			console.error(error);
	// 		}
	// 	};
	// 	getUserLikesAsync();
	// }, []);

	// 找出此貼文id的所有回復
	useEffect(() => {
		const getTweetRepliesAsync = async () => {
			try {
				// id 待替換
				const data = await getTweetReplies(174);
				setTweetRepliesData(data);
				console.warn('getTweetReplies data: ', data);
			} catch (error) {
				console.error(error);
			}
		};
		getTweetRepliesAsync();
	}, []);

	return (
		<div>
			<div className={style.replyListSectionHeader}>
				<Back style={{ cursor: 'pointer' }} />
				<h4>推文</h4>
			</div>
			<ReplyPost
				id={replyPostData.id}
				description={replyPostData.description}
				likedCounts={replyPostData.LikedCounts}
				repliesCounts={replyPostData.RepliesCounts}
				account={replyPostData.User.account}
				avatar={replyPostData.User.avatar}
				name={replyPostData.User.name}
				// isLikeByCurrentUser={}
			/>
			{tweetRepliesData.map(({ Tweet, User, UserId, comment, createdAt }) => {
				return (
					<ReplyItem
						key={UserId}
						tweetUserAccount={Tweet.User.account}
						replyUserAccount={User.account}
						avatar={User.avatar}
						name={User.name}
						comment={comment}
						createdAt={createdAt}
					/>
				);
			})}
		</div>
	);
};
