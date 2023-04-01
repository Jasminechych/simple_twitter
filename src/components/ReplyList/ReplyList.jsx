import style from 'src/components/ReplyList/ReplyList.module.scss';
import { ReplyItem } from 'src/components/ReplyItem/ReplyItem';
// import { getUserRepliedTweets } from 'src/apis/user';
// import { useEffect, useState } from 'react';
import { convertDateToHours } from 'src/utils/convertDateToHours';

export const ReplyList = ({ data, userData }) => {
	console.log('ReplyList data', data);
	// const currentUserId = JSON.parse(localStorage.getItem('currentUser')).currentUserId;
	// const currentUserAccount = JSON.parse(localStorage.getItem('currentUser')).currentUserAccount;
	// const currentUserName = JSON.parse(localStorage.getItem('currentUser')).currentUserName;
	// const currentUserAvatar = JSON.parse(localStorage.getItem('currentUser')).currentUserAvatar;

	console.log('reply list user data', userData);

	return (
		<div className={style.replyList}>
			{/* {isDataLoaded ? (
				data.map(({ id, comment, createdAt, Tweet }) => {
					const createHour = convertDateToHours(createdAt);
					return (
						<ReplyItem
							key={id}
							comment={comment}
							createdAt={createHour}
							name={currentUserName}
							avatar={currentUserAvatar}
							tweetUserAccount={Tweet.User.account || ''}
							replyUserAccount={currentUserAccount}
						/>
					);
				})
			) : (
				<h5>loading...</h5>
			)} */}

			{data.map(({ id, TweetId, comment, createdAt, Tweet }) => {
				const createHour = convertDateToHours(createdAt);
				return (
					<ReplyItem
						key={id}
						id={TweetId}
						comment={comment}
						createdAt={createHour}
						name={userData.name}
						avatar={userData.avatar}
						tweetUserAccount={Tweet.User.account}
					/>
				);
			})}
		</div>
	);
};
