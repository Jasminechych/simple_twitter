import style from 'src/components/LikeList/LikeList.module.scss';
import { TweetItem } from 'src/components/TweetItem/TweetItem';
import { convertDateToHours } from 'src/utils/convertDateToHours';

export const LikeList = ({ data, handleHeartClick, handleAvatarClick }) => {
	return (
		<div className={style.tweetList}>
			{data !== [] ? (
				data.map(({ id, TweetId, createdAt, Tweet, isLikeByUser }) => {
					const createHour = convertDateToHours(createdAt);
					return (
						<TweetItem
							key={id}
							tweetId={TweetId}
							userId={Tweet.User.id}
							description={Tweet.description}
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
