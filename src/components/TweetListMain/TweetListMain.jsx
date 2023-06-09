import { TweetItem } from 'src/components/TweetItem/TweetItem';
import style from 'src/components/TweetListMain/TweetListMain.module.scss';
import { useState, useEffect } from 'react';
import { getTweets, postLikeTweet, postUnLikeTweet } from 'src/apis/user';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { convertDateToHours } from 'src/utils/convertDateToHours';
import { Loading } from 'src/assets/icons';

export const TweetListMain = () => {
	// 全站的所有推文
	const [tweetsData, setTweetsData] = useState([]);

	// 控制資料載入完成
	const [isTweetListMainDataLoaded, setIsTweetListMainDataLoaded] = useState(false);

	// 控制點愛心 & 取消愛心點擊
	const [isLikingOrUnLiking, setIsLikingOrUnLiking] = useState({ id: '', likeOrUnlike: '' });
	const [isHeartClick, setIsHeartClick] = useState(false);

	const navigate = useNavigate();

	// 點選頭像連到使用者個人頁面
	const handleAvatarClick = (avatarId) => {
		navigate(`/user/${avatarId}`);
	};

	// 推文清單拿資料
	useEffect(() => {
		const fetchTweetListMainAsync = async () => {
			// 先驗證token，若無則直接回到signin
			const token = localStorage.getItem('token');
			if (!token) {
				navigate('signin');
				return;
			}
			try {
				// 取得全站所有推文
				const getTweetsData = await getTweets();
				setTweetsData(getTweetsData);

				// 控制資料載入完成
				setIsTweetListMainDataLoaded(true);
			} catch (error) {
				console.error(error);
			}
		};
		fetchTweetListMainAsync();
	}, [isTweetListMainDataLoaded, isHeartClick]);

	// 對貼文按愛心或取消愛心
	const handleHeartClick = useCallback((id, likeOrUnlike) => {
		setIsTweetListMainDataLoaded(false);

		setIsLikingOrUnLiking((prev) => {
			return { ...prev, id: id, likeOrUnlike: likeOrUnlike };
		});
	}, []);

	useEffect(() => {
		const postLikeOrUnlikeTweetAsync = async () => {
			try {
				// 按愛心
				if (isLikingOrUnLiking.id !== '') {
					if (isLikingOrUnLiking.likeOrUnlike === 'like') {
						await postLikeTweet(isLikingOrUnLiking.id);
						setIsHeartClick(!isHeartClick);
						return;
					} else {
						// 取消愛心
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

	return (
		<div className={style.tweetList}>
			{isTweetListMainDataLoaded ? (
				tweetsData.map(
					({ id, description, createdAt, LikedCounts, RepliesCounts, User, isLiked }) => {
						const createHour = convertDateToHours(createdAt);
						return (
							<TweetItem
								key={id}
								tweetId={id}
								userId={User.id}
								description={description}
								avatar={User.avatar}
								name={User.name}
								account={User.account}
								createdAt={createHour}
								replyCounts={RepliesCounts}
								likeCounts={LikedCounts}
								isLikeByUser={isLiked}
								handleHeartClick={handleHeartClick}
								handleAvatarClick={handleAvatarClick}
							/>
						);
					},
				)
			) : (
				<Loading />
			)}
		</div>
	);
};
