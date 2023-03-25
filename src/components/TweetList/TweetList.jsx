import { TweetItem } from 'src/components/TweetItem/TweetItem';
import style from 'src/components/TweetList/TweetList.module.scss';

export const TweetList = () => {
	return (
		<div className={style.tweetList}>
			<TweetItem />
			{/* {tweets.map(({ id, description, createdAt, Author }) => {
				const createdAtDate = new Date(createdAt);
				const hour = createdAtDate.getHours();
				return (
					<TweetItem
						key={id}
						id={id}
						description={description}
						avatar={Author.avatar}
						name={Author.name}
						account={Author.account}
						createdAt={hour}
						replyCounts={replyCounts}
						likeCounts={likeCounts}
						isLiked={isLiked}
					/>
				);
			})} */}
		</div>
	);
};
