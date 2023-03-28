import { ReplyPost } from 'src/components/ReplyPost/ReplyPost';
import { Back } from 'src/assets/icons/index';
import style from 'src/components/ReplyListSection/ReplyListSection.module.scss';
import { getOneTweet, getTweetReplies } from 'src/apis/user';
import { useState, useEffect } from 'react';
import { ReplyItem } from 'src/components/ReplyItem/ReplyItem';
import { useNavigate, useParams } from 'react-router-dom';

export const ReplyListSection = () => {
	const [replyPostData, setReplyPostData] = useState({});
	const [tweetRepliesData, setTweetRepliesData] = useState([]);
	const [isDataLoaded, setIsDataLoaded] = useState(false);
	const navigate = useNavigate();

	// 取的目前頁面的推文id
	const { id } = useParams();
	const cleanId = id.slice(1);


	// 取得單篇推文資料
	useEffect(() => {
		const getOneTweetAsync = async () => {
			try {
				// id 待替換
				const data = await getOneTweet(cleanId);
				// 拿到資料後儲存資料在 setReplyPostData
				// const restructureData = [
				// 	{
				// 		id: data.id,
				// 		description: data.description,
				// 		LikedCounts: data.LikedCounts,
				// 		RepliesCounts: data.RepliesCounts,
				// 		account: data.User.account,
				// 		avatar: data.User.avatar,
				// 		name: data.User.name,
				// 	},
				// ];
				console.warn('getOneTweet data: ', data);

				setReplyPostData(data);
				setIsDataLoaded(true);
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
				const data = await getTweetReplies(cleanId);
				// 拿到資料後儲存在setTweetRepliesData
				setTweetRepliesData(data);
				console.warn('getTweetReplies data: ', data);
			} catch (error) {
				console.error(error);
			}
		};
		getTweetRepliesAsync();
	}, []);

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
					// key={replyPostData.iid}
					id={replyPostData.id}
					description={replyPostData.description}
					likedCounts={replyPostData.LikedCounts}
					repliesCounts={replyPostData.RepliesCounts}
					account={replyPostData.User.account}
					avatar={replyPostData.User.avatar}
					name={replyPostData.User.name}
					createdAt={replyPostData.createdAt}
				/>
			) : (
				<h5>loading...</h5>
			)}
			{/* {isDataLoaded ? (
				replyPostData.map(
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
				)
			) : (
				<h5>loading...</h5>
			)} */}
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
