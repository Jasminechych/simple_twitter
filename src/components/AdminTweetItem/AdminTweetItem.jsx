import { ReactComponent as Close } from 'src/assets/icons/close.svg';
import { truncateString } from 'src/utils/truncateString';
import style from 'src/components/TweetItem/TweetItem.module.scss';

export const AdminTweetItem = ({
	id,
	description,
	avatar,
	name,
	account,
	createdAt,
	handleDelete,
}) => {
	const descriptionTruncateString = truncateString(description, 50);

	return (
		<div className={style.tweetItemContainer} id={id}>
			<section className={style.tweetItemAvatarSection}>
				<img className={style.tweetItemAvatar} src={avatar} />
			</section>

			<section className={style.tweetItemContentSection}>
				<div className={style.tweetItemHeaderInfo}>
					<p className={style.tweetItemUserName}>{name}</p>
					<p className={style.tweetItemUserAccount}>
						@{account} • {createdAt}
					</p>
				</div>

				<p className={style.tweetItemDescription}>{descriptionTruncateString}</p>
			</section>
			<Close
				onClick={() => handleDelete(id)}
				className={style.close}
				style={{ cursor: 'pointer' }}
			/>
		</div>
	);
};
