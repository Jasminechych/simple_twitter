import style from 'src/components/UserProfile/UserProfile.module.scss';
import { ButtonSW } from 'src/components/buttons';
import { ReactComponent as BackgroundPhoto } from 'src/assets/icons/background-photo.svg';
import { LikeList } from 'src/components/LikeList/LikeList';
import { ReplyListTab } from 'src/components/ReplyListTab/ReplyListTab';
import { TweetListTab } from 'src/components/TweetListTab/TweetListTab';
import { MainSection } from 'src/components/MainSection/MainSection';
import { Header } from 'src/components/Header/Header';
import { Link } from 'react-router-dom';
import { ReactComponent as BackArrow } from 'src/assets/icons/back.svg';
import { TweetList } from '../TweetList/TweetList';
import { useEffect, useState } from 'react';
import { ReplyList } from '../ReplyList/ReplyList';
import { getUserData } from 'src/apis/user';

export const UserProfile = ({ followingCounts, followerCounts, tweets }) => {
	const current = JSON.parse(localStorage.getItem('currentUser'));
	const [activeTab, setActiveTab] = useState('tweetList');
	console.log('tab: ', activeTab);

	const handleTabChange = (tab) => {
		setActiveTab(tab);
	};
	// 	使用者取得自己的資料
	const [initialValues, setInitialValues] = useState({
		id: current.currentUserId,
		name: current.currentUserName,
		account: current.currentUserAccount,
		avatar: current.currentUserAvatar,
		intro: current.currentUserIntroduction,
	});
	console.log('initialValues:', initialValues);

	// 取得
	useEffect(() => {
		const getUsersInfo = async () => {
			const currentUserId = JSON.parse(localStorage.getItem('currentUser'));
			console.log('currentUserId: ', currentUserId.currentUserId);
			try {
				const data = await getUserData(currentUserId.currentUserId);
				setInitialValues({
					id: data.id,
					name: data.name,
					account: data.account,
					avatar: data.avatar,
					intro: data.intro,
				});
			} catch (error) {
				console.error(error);
			}
		};
		getUsersInfo();
	}, []);

	return (
		<MainSection>
			<div className={style.userProfileHeaderWrapper}>
				<Link to='/main'>
					<BackArrow className={style.backArrow} />
				</Link>
				<div className={style.userHeader}>
					<Header header={initialValues.name} className={style.header} />
					<a href='' className={style.tweets}>{`${tweets}推文`}</a>
				</div>
			</div>
			<div className={style.userProfileContainer}>
				<div className={style.userProfileBackgroundPhoto}>
					<BackgroundPhoto />
				</div>
				<div className={style.userProfileAvatar}>
					<img src={initialValues.avatar} className={style.avatar} />
				</div>
				<div className={style.userProfileButton}>
					<Link to='/user/self/edit'>
						<ButtonSW text='編輯個人資料' />
					</Link>
				</div>
				<div className={style.userProfileInfoWrapper}>
					<div className={style.userProfileNameWrapper}>
						<h5 className={style.userProfileName}>{initialValues.name}</h5>
						<div className={style.userProfileSubName}>@{initialValues.account}</div>
					</div>
					<p className={style.userProfileIntro}>{initialValues.intro}</p>
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
					<TweetListTab
						className={activeTab === 'tweetList' ? style.active : style.tab}
						handleTabChange={handleTabChange}
					/>
					<ReplyListTab
						className={activeTab === 'replyPost' ? style.active : style.tab}
						handleTabChange={handleTabChange}
					/>
					<LikeList
						className={activeTab === 'likeList' ? style.active : style.tab}
						handleTabChange={handleTabChange}
					/>
				</div>
				<div>
					{activeTab === 'tweetList' && <TweetList />}
					{activeTab === 'replyPost' && <ReplyList />}
					{activeTab === 'likeList' && <TweetList />}
				</div>
			</div>
		</MainSection>
	);
};
