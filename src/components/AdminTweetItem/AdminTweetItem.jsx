import { ReactComponent as Close } from 'src/assets/icons/close.svg';

import style from 'src/components/TweetItem/TweetItem.module.scss';

export const AdminTweetItem = ({ id, description, avatar, name, account, createdAt }) => {
	return (
		<div className={style.tweetItemContainer} id={id}>
			<section className={style.tweetItemAvatarSection}>
				<img className={style.tweetItemAvatar} src={avatar} />
			</section>

			<section className={style.tweetItemContentSection}>
				<div className={style.tweetItemHeaderInfo}>
					<p className={style.tweetItemUserName}>{name}</p>
					<p className={style.tweetItemUserAccount}>
						@{account}・{createdAt} 小時
					</p>
				</div>

				<p className={style.tweetItemDescription}>{description}</p>
			</section>
			<Close />
		</div>
	);
};
