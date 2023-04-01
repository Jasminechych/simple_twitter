import style from 'src/components/LikeList/LikeList.module.scss';
import { TweetItem } from 'src/components/TweetItem/TweetItem';
// import { useCallback, useState, useEffect } from 'react';
// import { postLikeTweet, postUnLikeTweet } from 'src/apis/user';
import { convertDateToHours } from 'src/utils/convertDateToHours';

export const LikeList = ({ data, handleHeartClick, handleAvatarClick }) => {
	// const [isTweetListDataLoaded, setIsTweetListDataLoaded] = useState(true);
	// const [isLikingOrUnLiking, setIsLikingOrUnLiking] = useState({ id: '', likeOrUnlike: '' });
	// const [isHeartClick, setIsHeartClick] = useState(false);

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
				data.map(({ id, description, createdAt, Tweet, isLikeByUser }) => {
					const createHour = convertDateToHours(createdAt);
					return (
						<TweetItem
							key={id}
							id={Tweet.User.id}
							description={description}
							avatar={Tweet.User.avatar}
							name={Tweet.User.name}
							account={Tweet.User.account}
							createdAt={createHour}
							replyCounts={Tweet.RepliesCounts}
							likeCounts={Tweet.LikedCounts}
							isLikeByUser={isLikeByUser}
							handleHeartClick={handleHeartClick}
							handleAvatarClick={handleAvatarClick}
						/>
					);
				})
			) : (
				<h5>loading...</h5>
			)}
		</div>
	);
};
