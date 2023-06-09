import { TweetItem } from 'src/components/TweetItem/TweetItem';
import style from 'src/components/TweetList/TweetList.module.scss';
import { convertDateToHours } from 'src/utils/convertDateToHours';
import { Loading } from 'src/assets/icons';

export const TweetList = ({ data, handleHeartClick, handleAvatarClick }) => {
	return (
		<div className={style.tweetList}>
			{data !== [] ? (
				data.map(
					({ id, description, createdAt, LikedCounts, RepliesCounts, User, isLikeByUser }) => {
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
								isLikeByUser={isLikeByUser}
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
