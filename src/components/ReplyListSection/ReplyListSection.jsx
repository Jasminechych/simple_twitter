import { ReplyPost } from 'src/components/ReplyPost/ReplyPost';
import { Back } from 'src/assets/icons/index';
import style from 'src/components/ReplyListSection/ReplyListSection.module.scss';
import { getOneTweet, getTweetReplies } from 'src/apis/user';
import { useState, useEffect } from 'react';
import { ReplyItem } from 'src/components/ReplyItem/ReplyItem';

export const ReplyListSection = () => {
	const [replyPostData, setReplyPostData] = useState([]);
	const [tweetRepliesData, setTweetRepliesData] = useState([]);

	// 取得單篇推文資料
	useEffect(() => {
		const getOneTweetAsync = async () => {
			try {
				// id 待替換
				const data = await getOneTweet(174);
				// 拿到資料後儲存資料在 setReplyPostData
				const restructureData = [
					{
						id: data.id,
						description: data.description,
						LikedCounts: data.LikedCounts,
						RepliesCounts: data.RepliesCounts,
						account: data.User.account,
						avatar: data.User.avatar,
						name: data.User.name,
					},
				];

				setReplyPostData(restructureData);
			} catch (error) {
				console.error(error);
			}
		};
		getOneTweetAsync();
	}, []);

	// 找出此貼文id的所有回復
	useEffect(() => {
		const getTweetRepliesAsync = async () => {
			try {
				// id 待替換
				const data = await getTweetReplies(174);
				// 拿到資料後儲存在setTweetRepliesData
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
			{replyPostData.map(
				({ id, description, LikedCounts, RepliesCounts, account, avatar, name }) => {
					return (
						<ReplyPost
							key={id}
							id={id}
							description={description}
							likedCounts={LikedCounts}
							repliesCounts={RepliesCounts}
							account={account}
							avatar={avatar}
							name={name}
						/>
					);
				},
			)}
			{tweetRepliesData.map(({ Tweet, User, comment, createdAt }) => {
				return (
					<ReplyItem
						key={comment}
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
