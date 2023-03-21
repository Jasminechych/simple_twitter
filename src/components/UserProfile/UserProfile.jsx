import style from 'src/components/UserProfile/UserProfile.module.scss';
import { ButtonSW } from 'src/components/buttons';
import { ReactComponent as BackgroundPhoto } from 'src/assets/icons/background-photo.svg';
import { ReactComponent as ManAvatar } from 'src/assets/icons/man-avatar.svg';

export const UserProfile = ({ username, followingCount, followerCount }) => {
	return (
		<div className={style.userProfileContainer}>
			<div className={style.userProfileBackgroundPhoto}>
				<BackgroundPhoto />
			</div>
			<div className={style.userProfileAvatar}>
				<ManAvatar />
			</div>
			<div className={style.userProfileButton}>
				<ButtonSW text='編輯個人資料' />
			</div>
			<div className={style.userProfileInfoWrapper}>
				<div className={style.userProfileNameWrapper}>
					<h5 className={style.userProfileName}>{username}</h5>
					<div className={style.userProfileSubName}>@{username}</div>
				</div>
				<p className={style.userProfileIntro}>
					I am Sarah, a software engineer with 7 years of experience. Nice to meet you!
				</p>
				<div className={style.userProfileFollowInfoWrapper}>
					<div className={style.userProfileFollowing}>{followingCount}跟隨中</div>
					<div className={style.userProfileFollower}>{followerCount}跟隨者</div>
				</div>
			</div>
		</div>
	);
};
