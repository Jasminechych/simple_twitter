import style from 'src/components/UserItem/UserItem.module.scss';
import { ButtonS, ButtonSW } from 'src/components/buttons';
import { useState } from 'react';

export const UserItem = ({ id, name, description, avatar, initIsFollowing }) => {
	const [isFollowing, setIsFollowing] = useState(initIsFollowing);

	const handleFollowClick = () => {
		setIsFollowing(!isFollowing);
	};

	return (
		<div className={style.userItemContainer} id={id}>
			<div className={style.userItemWrapper}>
				<div className={style.userItemAvatar}>
					<img src={avatar} alt={avatar} />
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
