import { TweetItem } from 'src/components/TweetItem/TweetItem';
import style from 'src/components/TweetList/TweetList.module.scss';
import { useState, useEffect } from 'react';
import { getTweets, getUserLikes } from 'src/apis/user';
import { postLikeTweet, postUnLikeTweet } from 'src/apis/user';
import { useCallback } from 'react';
import { useMemo } from 'react';

export const TweetList = () => {
	const [tweetListData, setTweetListData] = useState([]);
	const [isDataLoaded, setIsDataLoaded] = useState(false);
	const [userLikeData, setUserLikeData] = useState([]);
	const [isUserLikeDataLoaded, setIsUserLikeDataLoaded] = useState(false);
	const currentUserId = JSON.parse(localStorage.getItem('currentUser')).currentUserId;
	const [isLikingOrUnLiking, setIsLikingOrUnLiking] = useState({ id: '', likeOrUnlike: '' });
	const [isHeartClick, setIsHeartClick] = useState(false);

	// 查看所有推文
	useEffect(() => {
		const getTweetsAsync = async () => {
			try {
				const data = await getTweets();
				// 待刪改
				setTweetListData(data);
				console.log('執行 getTweets');
				setIsDataLoaded(true);
			} catch (error) {
				console.error(error);
			}
		};
		getTweetsAsync();
	}, [isHeartClick]);

	// 查看使用者喜歡過的推文
	useEffect(() => {
		const getUserLikesAsync = async () => {
			try {
				const data = await getUserLikes(currentUserId);
				setUserLikeData(data);
				setIsUserLikeDataLoaded(true);
				console.log('執行 getUserLikes');
			} catch (error) {
				console.error(error);
			}
		};
		getUserLikesAsync();
	}, [isHeartClick]);

	// 按讚或取消按讚
	// const handleHeartClick = (id, likeOrUnlike) => {
	// 	console.log('click id: ', id, likeOrUnlike);
	// 	setIsLikingOrUnLiking({ id: id, likeOrUnlike: likeOrUnlike });
	// 	setIsDataLoaded(false);
	// 	setIsUserLikeDataLoaded(false);
	// };

	// 需要再優化
	const handleHeartClick = useCallback((id, likeOrUnlike) => {
		console.log('click id: ', id, likeOrUnlike);
		setIsLikingOrUnLiking({ id: id, likeOrUnlike: likeOrUnlike });
		setIsDataLoaded(false);
		setIsUserLikeDataLoaded(false);
	}, []);

	useEffect(() => {
		const postLikeOrUnlikeTweetAsync = async () => {
			// matchData = [];
			try {
				if (isLikingOrUnLiking.id !== '') {
					if (isLikingOrUnLiking.likeOrUnlike === 'like') {
						await postLikeTweet(isLikingOrUnLiking.id);
						setIsHeartClick(!isHeartClick);
						return;
					} else {
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

	// 比對使用者喜歡的貼文與全部貼文
	// let matchData = [];
	// if (isDataLoaded && isUserLikeDataLoaded) {
	// 	matchData = tweetListData.map((item) => {
	// 		console.log('item', item);
	// 		const isLiked = userLikeData.some((likeItem) => {
	// 			console.log('likeItem', likeItem);
	// 			return likeItem.TweetId === item.id;
	// 		});
	// 		console.log('比對貼文');
	// 		// 如果該推文有被使用者按讚，則將 isLikeByUser 設為 true，否則為 false
	// 		return {
	// 			...item,
	// 			isLikeByUser: isLiked,
	// 		};
	// 	});
	// }
	// 需要再優化
	const matchData = useMemo(() => {
		if (!isDataLoaded || !isUserLikeDataLoaded) return [];
		return tweetListData.map((item) => {
			const isLiked = userLikeData.some((likeItem) => likeItem.TweetId === item.id);
			return { ...item, isLikeByUser: isLiked };
		});
	}, [isDataLoaded, isUserLikeDataLoaded, tweetListData, userLikeData]);

	console.log('matchData: ', matchData);

	return (
		<div className={style.tweetList}>
			{isDataLoaded && isUserLikeDataLoaded ? (
				matchData.map(
					({ id, description, createdAt, LikedCounts, RepliesCounts, User, isLikeByUser }) => {
						const createdAtDate = new Date(createdAt);
						const hour = createdAtDate.getHours();
						return (
							<TweetItem
								key={id}
								id={id}
								description={description}
								avatar={User.avatar}
								name={User.name}
								account={User.account}
								createdAt={hour}
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
