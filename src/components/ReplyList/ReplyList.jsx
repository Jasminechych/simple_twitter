import style from 'src/components/ReplyList/ReplyList.module.scss';
import { ReplyItem } from 'src/components/ReplyItem/ReplyItem';
import { getUserRepliedTweets } from 'src/apis/user';
import { useEffect, useState } from 'react';

export const ReplyList = () => {
	const currentUserId = JSON.parse(localStorage.getItem('currentUser')).currentUserId;
	const currentUserAccount = JSON.parse(localStorage.getItem('currentUser')).currentUserAccount;
	const currentUserName = JSON.parse(localStorage.getItem('currentUser')).currentUserName;
	const currentUserAvatar = JSON.parse(localStorage.getItem('currentUser')).currentUserAvatar;
	const [userRepliedData, setUserRepliedData] = useState([]);
	const [isDataLoaded, setIsDataLoaded] = useState(false);

	// 取得使用者回覆過的所有推文
	useEffect(() => {
		const getUserRepliedTweetsAsync = async () => {
			try {
				const data = await getUserRepliedTweets(currentUserId);
				setUserRepliedData(data);
				setIsDataLoaded(true);
				console.log('getUserRepliedTweets', data);
			} catch (error) {
				console.log(error);
			}
		};
		getUserRepliedTweetsAsync();
	}, []);

	return (
		<div className={style.replyList}>
			{isDataLoaded ? (
				userRepliedData.map(({ id, comment, createdAt, Tweet }) => {
					return (
						<ReplyItem
							key={id}
							comment={comment}
							createdAt={createdAt}
							name={currentUserName}
							avatar={currentUserAvatar}
							tweetUserAccount={Tweet.User.account || ''}
							replyUserAccount={currentUserAccount}
						/>
					);
				})
			) : (
				<h5>loading...</h5>
			)}
		</div>
	);
};
