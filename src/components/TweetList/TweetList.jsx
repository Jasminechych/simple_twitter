import { TweetItem } from 'src/components/TweetItem/TweetItem';
import style from 'src/components/TweetList/TweetList.module.scss';
// import { useState, useEffect } from 'react';
// import { getTweets, getUserLikes, getUserTweets } from 'src/apis/user';
// import { postLikeTweet, postUnLikeTweet } from 'src/apis/user';
// import { useCallback } from 'react';
// import { useMemo } from 'react';
// import { useNavigate } from 'react-router-dom';
import { convertDateToHours } from 'src/utils/convertDateToHours';

export const TweetList = ({ data, handleHeartClick }) => {
	// const currentUserId = JSON.parse(localStorage.getItem('currentUser')).currentUserId;
	// console.log('TweetList data', data);

	// const [tweetListData, setTweetListData] = useState([]);
	// const [isDataLoaded, setIsDataLoaded] = useState(true);
	// const [userLikeData, setUserLikeData] = useState([]);
	// const [isTweetListDataLoaded, setIsTweetListDataLoaded] = useState(true);
	// const [isLikingOrUnLiking, setIsLikingOrUnLiking] = useState({ id: '', likeOrUnlike: '' });
	// const [isHeartClick, setIsHeartClick] = useState(false);
	// const navigate = useNavigate();
	// const [isUserTweetsDataLoaded, setIsUserTweetsDataLoaded] = useState(false);

	// 對貼文按愛心或取消愛心
	// const handleHeartClick = useCallback(
	// 	(id, likeOrUnlike) => {
	// 		setIsTweetListDataLoaded(false);

	// 		console.log('click id: ', id, likeOrUnlike);
	// 		setIsLikingOrUnLiking((prev) => {
	// 			return { ...prev, id: id, likeOrUnlike: likeOrUnlike };
	// 		});
	// 	},
	// 	[isHeartClick],
	// );

	// useEffect(() => {
	// 	const postLikeOrUnlikeTweetAsync = async () => {
	// 		try {
	// 			// 按愛心
	// 			if (isLikingOrUnLiking.id !== '') {
	// 				if (isLikingOrUnLiking.likeOrUnlike === 'like') {
	// 					await postLikeTweet(isLikingOrUnLiking.id);
	// 					setIsHeartClick(!isHeartClick);
	// 					return;
	// 				} else {
	// 					// 取消愛心
	// 					await postUnLikeTweet(isLikingOrUnLiking.id);
	// 					setIsHeartClick(!isHeartClick);
	// 				}
	// 			}
	// 		} catch (error) {
	// 			console.error(error);
	// 		}
	// 	};
	// 	postLikeOrUnlikeTweetAsync();
	// }, [isLikingOrUnLiking]);

	return (
		<div className={style.tweetList}>
			{data !== [] ? (
				data.map(
					({ id, description, createdAt, LikedCounts, RepliesCounts, User, isLikeByUser }) => {
						const createHour = convertDateToHours(createdAt);
						return (
							<TweetItem
								key={id}
								id={id}
								description={description}
								avatar={User.avatar}
								name={User.name}
								account={User.account}
								createdAt={createHour}
								replyCounts={RepliesCounts}
								likeCounts={LikedCounts}
								isLikeByUser={isLikeByUser}
								handleHeartClick={handleHeartClick}
							/>
						);
					},
				)
			) : (
				<h5>loading...</h5>
			)}
		</div>
	);
};
