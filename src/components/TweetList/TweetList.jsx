import { TweetItem } from 'src/components/TweetItem/TweetItem';
import style from 'src/components/TweetList/TweetList.module.scss';
import { useState, useEffect } from 'react';
import { getTweets } from 'src/apis/user';

export const TweetList = () => {
	const [tweetListData, setTweetListData] = useState([]);
	const [isDataLoaded, setIsDataLoaded] = useState(false);

	// 查看所有推文
	useEffect(() => {
		const getTweetsAsync = async () => {
			try {
				const data = await getTweets();

				setTweetListData(data);
				setIsDataLoaded(true);
			} catch (error) {
				console.error(error);
			}
		};
		getTweetsAsync();
	}, []);

	return (
		<div className={style.tweetList}>
			{tweetListData.map(({ id, description, createdAt, LikedCounts, RepliesCounts, User }) => {
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
						// isLiked={isLiked} // 待確認
						// handleTweetClick={handleTweetClick}
					/>
				);
			})}

		</div>
	);
};
