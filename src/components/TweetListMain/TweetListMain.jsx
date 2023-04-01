import { TweetItem } from 'src/components/TweetItem/TweetItem';
import style from 'src/components/TweetList/TweetList.module.scss';
import { useState, useEffect } from 'react';
import { getTweets, getUserLikes, getUserTweets } from 'src/apis/user';
import { postLikeTweet, postUnLikeTweet } from 'src/apis/user';
import { useCallback } from 'react';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { convertDateToHours } from 'src/utils/convertDateToHours';
import { useUserData } from 'src/context/UserContext';

export const TweetList = ({ tab }) => {
	const currentUserId = JSON.parse(localStorage.getItem('currentUser')).currentUserId;

	// const [tweetListData, setTweetListData] = useState([]);
	const [isDataLoaded, setIsDataLoaded] = useState(false);
	const [userLikeData, setUserLikeData] = useState([]);
	const [isUserLikeDataLoaded, setIsUserLikeDataLoaded] = useState(false);
	const [isLikingOrUnLiking, setIsLikingOrUnLiking] = useState({ id: '', likeOrUnlike: '' });
	const [isHeartClick, setIsHeartClick] = useState(false);
	const navigate = useNavigate();
	const [isUserTweetsDataLoaded, setIsUserTweetsDataLoaded] = useState(false);

	const { tweetsData, setTweetsData, userTweetsData, setUserTweetsData } = useUserData();

	// 查看全站所有推文
	useEffect(() => {
		const getTweetsAsync = async () => {
			try {
				const data = await getTweets();
				// 待刪改
				setTweetsData(data);
				setIsDataLoaded(true);
			} catch (error) {
				console.error(error);
			}
		};
		getTweetsAsync();
	}, [isHeartClick]);

	// 查看使用者所有推文
	useEffect(() => {
		const getUserTweetsAsync = async () => {
			try {
				const data = await getUserTweets();
				// 待刪改
				setUserTweetsData(data);
				setIsUserTweetsDataLoaded(true);
			} catch (error) {
				console.error(error);
			}
		};
		getUserTweetsAsync();
	}, [isHeartClick]);

	// 查看使用者喜歡過的推文
	useEffect(() => {
		const getUserLikesAsync = async () => {
			try {
				// 取得token
				const token = localStorage.getItem('token');

				// 先驗證token，若無則直接回到signin
				if (!token) {
					navigate('signin');
					return;
				}
				const data = await getUserLikes(currentUserId);
				setUserLikeData(data);
				setIsUserLikeDataLoaded(true);
			} catch (error) {
				console.error(error);
			}
		};
		getUserLikesAsync();
	}, [isHeartClick]);

	// 對貼文按愛心或取消愛心
	// 需要再優化
	const handleHeartClick = useCallback((id, likeOrUnlike) => {
		console.log('click id: ', id, likeOrUnlike);
		setIsLikingOrUnLiking({ id: id, likeOrUnlike: likeOrUnlike });
		setIsDataLoaded(false);
		setIsUserLikeDataLoaded(false);
	}, []);

	useEffect(() => {
		const postLikeOrUnlikeTweetAsync = async () => {
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

	// 比對使用者喜歡的貼文資料
	// 讓使用者喜歡貼文清單帶上 isLikeByUser: true
	const matchData = useMemo(() => {
		if (
			(!isDataLoaded && !isUserLikeDataLoaded) ||
			(!isUserTweetsDataLoaded && !isUserLikeDataLoaded)
		)
			return [];

		//首頁全部推文清單
		if (tab === 'totalTweetList') {
			return tweetsData.map((item) => {
				const isLiked = userLikeData.some((likeItem) => likeItem.TweetId === item.id);
				return { ...item, isLikeByUser: isLiked };
			});
		}

		// 個人資料頁面使用者全部推文
		if (tab === 'tweetList' || tab === undefined) {
			return userTweetsData.map((item) => {
				const isLiked = userLikeData.some((likeItem) => likeItem.TweetId === item.id);
				return { ...item, isLikeByUser: isLiked };
			});
		}

		// 個人資料頁面使用者喜歡貼文
		if (tab === 'likeList') {
			return userLikeData.map((item) => {
				return { ...item, isLikeByUser: true };
			});
		}
	}, [isDataLoaded, isUserLikeDataLoaded, tweetsData, userLikeData]);

	return (
		<div className={style.tweetList}>
			{isDataLoaded && isUserLikeDataLoaded ? (
				matchData.map(
					({
						id,
						description,
						createdAt,
						LikedCounts,
						RepliesCounts,
						User,
						Tweet,
						isLikeByUser,
					}) => {
						const hour = convertDateToHours(createdAt);
						return (
							<TweetItem
								key={id}
								id={id}
								description={
									tab === 'tweetList' || tab === undefined ? description : Tweet.description
								}
								avatar={tab === 'tweetList' || tab === undefined ? User.avatar : Tweet.User.avatar}
								name={tab === 'tweetList' || tab === undefined ? User.name : Tweet.User.name}
								account={
									tab === 'tweetList' || tab === undefined ? User.account : Tweet.User.account
								}
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
