import style from 'src/components/UserItem/UserItem.module.scss';
import { ReactComponent as Avatar } from 'src/assets/icons/addphoto.svg';
import { ButtonS, ButtonSW } from 'src/components/buttons';
import { useState } from 'react';

export const UserItem = ({ name, description }) => {
	const [isFollowing, setIsFollowing] = useState(true);

	const handleFollowClick = () => {
		setIsFollowing(!isFollowing);
	};

	return (
		<div className={style.userItemContainer}>
			<div className={style.userItemWrapper}>
				<div className={style.userItemAvatar}>
					<Avatar />
				</div>
				<div className={style.userItemInfoWrapper}>
					<div className={style.userItemName}>{name}</div>
					<div className={style.userItemDescription}>{description}</div>
				</div>
				<div className={style.userItemButton}>
					{isFollowing ? (
						<ButtonS text='正在跟隨' onClick={handleFollowClick} />
					) : (
						<ButtonSW text='跟隨' onClick={handleFollowClick} />
					)}
				</div>
			</div>
		</div>
	);
};
