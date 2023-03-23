import style from 'src/components/UserProfile/UserProfile.module.scss';
import { ButtonSW } from 'src/components/buttons';
import { ReactComponent as BackgroundPhoto } from 'src/assets/icons/background-photo.svg';
import { ReactComponent as AddPhoto } from 'src/assets/icons/addphoto.svg';
import { LikeList } from 'src/components/LikeList/LikeList';
import { ReplyListTab } from 'src/components/ReplyListTab/ReplyListTab';
import { TweetListTab } from 'src/components/TweetListTab/TweetListTab';
import { MainSection } from 'src/components/MainSection/MainSection';
import { Header } from 'src/components/Header/Header';
import { Link } from 'react-router-dom';

export const UserProfile = ({ name, account, intro, followingCounts, followerCounts }) => {
	return (
		<MainSection>
			<Header header='首頁' />
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
						<h5 className={style.userProfileName}>{name}</h5>
						<div className={style.userProfileSubName}>@{account}</div>
					</div>
					<p className={style.userProfileIntro}>{intro}</p>
					<div className={style.userProfileFollowInfoWrapper}>
						<div className={style.userProfileFollowing}>
							{followingCounts}
							<Link to='/following'>跟隨中</Link>
						</div>
						<div className={style.userProfileFollower}>
							{followerCounts}
							<Link to='/follower'>跟隨者</Link>
						</div>
					</div>
				</div>
				<div className={style.tabContainer}>
					<TweetListTab />
					<ReplyListTab />
					<LikeList />
				</div>
			</div>
		</MainSection>
	);
};
