import style from 'src/components/UserProfile/UserProfile.module.scss';
import { ButtonSW } from 'src/components/buttons';
import { ReactComponent as BackgroundPhoto } from 'src/assets/icons/background-photo.svg';
import { ReactComponent as AddPhoto } from 'src/assets/icons/addphoto.svg';
import { LikeList } from 'src/components/LikeList/LikeList';

export const UserProfile = ({ username, intro, followingCount, followerCount }) => {
	return (
		<div className={style.userProfileContainer}>
			<div className={style.userProfileBackgroundPhoto}>
				<BackgroundPhoto />
			</div>
			<div className={style.userProfileAvatar}>
				<AddPhoto />
			</div>
			<div className={style.userProfileButton}>
				<ButtonSW text='編輯個人資料' />
			</div>
			<div className={style.userProfileInfoWrapper}>
				<div className={style.userProfileNameWrapper}>
					<h5 className={style.userProfileName}>{username}</h5>
					<div className={style.userProfileSubName}>@{username}</div>
				</div>
				<p className={style.userProfileIntro}>{intro}</p>
				<div className={style.userProfileFollowInfoWrapper}>
					<div className={style.userProfileFollowing}>
						{followingCount}
						<a href=''>跟隨中</a>
					</div>
					<div className={style.userProfileFollower}>
						{followerCount}
						<a href=''>跟隨者</a>
					</div>
				</div>
			</div>
			<div className={style.tabContainer}>
				<LikeList />
			</div>
		</div>
	);
};
