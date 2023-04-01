import { TweetItem } from 'src/components/TweetItem/TweetItem';
import style from 'src/components/TweetListMain/TweetListMain.module.scss';
import { useState, useEffect } from 'react';
import { getTweets, getUserLikes } from 'src/apis/user';
import { postLikeTweet, postUnLikeTweet } from 'src/apis/user';
import { useCallback } from 'react';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { convertDateToHours } from 'src/utils/convertDateToHours';
import { useUserData } from 'src/context/UserContext';

export const TweetListMain = () => {
	// 目前登入的使用者 ID
	const currentUserId = JSON.parse(localStorage.getItem('currentUser')).currentUserId;

	// const [tweetListData, setTweetListData] = useState([]);
	const [isTweetListMainDataLoaded, setIsTweetListMainDataLoaded] = useState(false);
	// const [userLikeData, setUserLikeData] = useState([]);
	// const [isUserLikeDataLoaded, setIsUserLikeDataLoaded] = useState(false);
	const [isLikingOrUnLiking, setIsLikingOrUnLiking] = useState({ id: '', likeOrUnlike: '' });
	const [isHeartClick, setIsHeartClick] = useState(false);
	const navigate = useNavigate();
	// const [isUserTweetsDataLoaded, setIsUserTweetsDataLoaded] = useState(false);

	const { tweetsData, setTweetsData, userLikeData, setUserLikeData } = useUserData();

	// 查看全站所有推文
	useEffect(() => {
		const fetchTweetListMainAsync = async () => {
			try {
				// 先驗證token，若無則直接回到signin
				const token = localStorage.getItem('token');
				if (!token) {
					navigate('signin');
					return;
				}

				// 取得全站所有推文
				const getTweetsData = await getTweets();
				setTweetsData(getTweetsData);

				// 取得使用者喜歡的推文
				const getUserLikesData = await getUserLikes(currentUserId);
				setUserLikeData(getUserLikesData);

				setIsTweetListMainDataLoaded(true);
			} catch (error) {
				console.error(error);
			}
		};
		fetchTweetListMainAsync();
	}, [isHeartClick]);

	// 對貼文按愛心或取消愛心
	// 需要再優化
	const handleHeartClick = useCallback((id, likeOrUnlike) => {
		console.log('click id: ', id, likeOrUnlike);
		setIsLikingOrUnLiking({ id: id, likeOrUnlike: likeOrUnlike });
		setIsTweetListMainDataLoaded(false);
	}, []);

	// 對推文按讚或取消按讚
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
		if (!isTweetListMainDataLoaded) return [];

		return tweetsData.map((item) => {
			const isLiked = userLikeData.some((likeItem) => likeItem.TweetId === item.id);
			return { ...item, isLikeByUser: isLiked };
		});
	}, [isTweetListMainDataLoaded, tweetsData, userLikeData]);

	console.log('matchData', matchData);

	return (
		<div className={style.tweetList}>
			{isTweetListMainDataLoaded ? (
				matchData.map(
					({
						id,
						description,
						createdAt,
						LikedCounts,
						RepliesCounts,
						User,
						// Tweet,
						isLikeByUser,
					}) => {
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
