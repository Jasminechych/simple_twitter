import { ReplyPost } from 'src/components/ReplyPost/ReplyPost';
import { Back } from 'src/assets/icons/index';
import style from 'src/components/ReplyListSection/ReplyListSection.module.scss';
import { getOneTweet, getTweetReplies, getUserLikes } from 'src/apis/user';
import { useState, useEffect } from 'react';
import { ReplyItem } from 'src/components/ReplyItem/ReplyItem';
import { useNavigate, useParams } from 'react-router-dom';

export const ReplyListSection = () => {
	const [replyPostData, setReplyPostData] = useState({});
	const [tweetRepliesData, setTweetRepliesData] = useState([]);
	const [isDataLoaded, setIsDataLoaded] = useState(false);
	const [currentUserLikesData, setCurrentUserLikesData] = useState([]);

	const navigate = useNavigate();
	const currentUserId = JSON.parse(localStorage.getItem('currentUser')).currentUserId;

	// 取的目前頁面的推文id
	const { id } = useParams();
	const cleanId = id.slice(1);

	// 取得單篇推文資料
	useEffect(() => {
		const getReplyListDataAsync = async () => {
			try {
				// 取得一篇推文
				const data = await getOneTweet(cleanId);
				setReplyPostData(data);
				setIsDataLoaded(true);

				// 取得目前使用者 follow 清單
				const getUserLikesData = await getUserLikes(currentUserId);
				setCurrentUserLikesData(getUserLikesData);
			} catch (error) {
				console.error(error);
			}
		};
		getReplyListDataAsync();
	}, []);

	// 找出此貼文id的所有回復
	useEffect(() => {
		const getTweetRepliesAsync = async () => {
			try {
				const data = await getTweetReplies(cleanId);
				// 拿到資料後儲存在setTweetRepliesData
				setTweetRepliesData(data);
				console.log('執行getTweetReplies');
				// console.log('data', data);
			} catch (error) {
				console.error(error);
			}
		};
		getTweetRepliesAsync();
	}, []);

	console.log('tweetRepliesData: ', tweetRepliesData);

	// 單一推文比對使用者喜歡貼文是否相同
	const isLikeByCurrentUser = currentUserLikesData.map((item) => {
		if (item.TweetId === replyPostData.id) {
			return true;
		} else {
			return false;
		}
	});

	const handleClick = () => {
		navigate('/main');
	};

	return (
		<div>
			<div className={style.replyListSectionHeader}>
				<Back style={{ cursor: 'pointer' }} onClick={handleClick} />
				<h4>推文</h4>
			</div>

			{isDataLoaded ? (
				<ReplyPost
					id={replyPostData.id}
					description={replyPostData.description}
					likedCounts={replyPostData.LikedCounts}
					repliesCounts={replyPostData.RepliesCounts}
					account={replyPostData.User.account}
					avatar={replyPostData.User.avatar}
					name={replyPostData.User.name}
					createdAt={replyPostData.createdAt}
					isLikeByCurrentUser={isLikeByCurrentUser}
				/>
			) : (
				<h5>loading...</h5>
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
