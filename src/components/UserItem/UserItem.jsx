import style from 'src/components/UserItem/UserItem.module.scss';
import { ButtonS, ButtonSW } from 'src/components/buttons';
import { truncateString } from 'src/utils/truncateString';

export const UserItem = ({ id, name, description, avatar, isFollowing, handleFollowClick }) => {
	const descriptionTruncateString = truncateString(description, 50);
	return (
		<div className={style.userItemContainer} id={id}>
			<div className={style.userItemWrapper}>
				<div>
					<img src={avatar} alt={avatar} className={style.userItemAvatar} />
				</div>
				<div className={style.userItemInfoWrapper}>
					<div className={style.userItemName}>{name}</div>
					<div className={style.userItemDescription}>{descriptionTruncateString}</div>
				</div>
				<div className={style.userItemButton}>
					{isFollowing ? (
						<ButtonS text='正在跟隨' onClick={() => handleFollowClick(id, 'unFollow')} />
					) : (
						<ButtonSW text='跟隨' onClick={() => handleFollowClick(id, 'follow')} />
					)}
				</div>
			</div>
		</div>
	);
};
