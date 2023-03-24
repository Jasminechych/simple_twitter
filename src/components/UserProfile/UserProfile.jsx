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
import { ReactComponent as BackArrow } from 'src/assets/icons/back.svg';
import { TweetList } from '../TweetList/TweetList';
import { useState } from 'react';
import { ReplyPost } from '../ReplyPost/ReplyPost';

export const UserProfile = ({ name, account, intro, followingCounts, followerCounts, tweets }) => {
	const [tab, setTab] = useState('tweetList');
	console.log('tab: ', tab);

	const handleTabChange = (tab) => {
		setTab(tab);
	};

	return (
		<MainSection>
			<div className={style.userProfileHeaderWrapper}>
				<Link to='/main'>
					<BackArrow className={style.backArrow} />
				</Link>
				<div className={style.userHeader}>
					<Header header={name} className={style.header} />
					<a href='' className={style.tweets}>{`${tweets}推文`}</a>
				</div>
			</div>
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
					<TweetListTab handleTabChange={handleTabChange} />
					<ReplyListTab handleTabChange={handleTabChange} />
					<LikeList handleTabChange={handleTabChange} />
				</div>
				<div>
					{tab === 'tweetList' && <TweetList />}
					{tab === 'replyPost' && <ReplyPost />}
					{tab === 'likeList' && <TweetList />}
				</div>
			</div>
		</MainSection>
	);
};
