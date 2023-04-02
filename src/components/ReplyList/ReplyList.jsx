import style from 'src/components/ReplyList/ReplyList.module.scss';
import { ReplyItem } from 'src/components/ReplyItem/ReplyItem';
import { convertDateToHours } from 'src/utils/convertDateToHours';

export const ReplyList = ({ data, userData, handleAvatarClick }) => {
	return (
		<div className={style.replyList}>
			{data.map(({ id, TweetId, comment, createdAt, Tweet }) => {
				const createHour = convertDateToHours(createdAt);
				return (
					<ReplyItem
						key={id}
						id={TweetId}
						comment={comment}
						createdAt={createHour}
						name={userData.name}
						avatar={userData.avatar}
						tweetUserAccount={Tweet.User.account}
						handleAvatarClick={handleAvatarClick}
					/>
				);
			})}
		</div>
	);
};
