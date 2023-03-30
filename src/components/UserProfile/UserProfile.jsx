import style from 'src/components/UserProfile/UserProfile.module.scss';
import { ButtonS, ButtonSW } from 'src/components/buttons';
import { ReactComponent as BackgroundPhoto } from 'src/assets/icons/background-photo.svg';
import { LikeList } from 'src/components/LikeList/LikeList';
import { ReplyListTab } from 'src/components/ReplyListTab/ReplyListTab';
import { TweetListTab } from 'src/components/TweetListTab/TweetListTab';
import { MainSection } from 'src/components/MainSection/MainSection';
import { Header } from 'src/components/Header/Header';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ReactComponent as BackArrow } from 'src/assets/icons/back.svg';
import { TweetList } from '../TweetList/TweetList';
import { useEffect, useState } from 'react';
import { ReplyList } from '../ReplyList/ReplyList';
import { getUserData } from 'src/apis/user';
import { MessageFilled, MessageOutline, NotiFilled, NotiOutline } from 'src/assets/icons';

export const UserProfile = ({ followingCounts, followerCounts, tweets }) => {
	const navigate = useNavigate();
	const current = JSON.parse(localStorage.getItem('currentUser'));
	const [activeTab, setActiveTab] = useState('tweetList');
	const location = useLocation();
	const currentPath = location.pathname;
	const [messageClicked, setMessageClicked] = useState(false);
	const [notiClicked, setNotiClicked] = useState(false);

	const handleTabChange = (tab) => {
		setActiveTab(tab);
	};
	// 	使用者取得自己的資料
	const [initialValues, setInitialValues] = useState({
		id: current.currentUserId,
		name: current.currentUserName,
		account: current.currentUserAccount,
		avatar: current.currentUserAvatar,
		introduction: current.currentUserIntroduction,
	});

	// 取得
	useEffect(() => {
		const getUsersInfo = async () => {
			try {
				const token = localStorage.getItem('token');

				// 先驗證token，若無則直接回到signin
				if (!token) {
					navigate('/signin', { replace: true });
					return;
				}
				const currentUserId = JSON.parse(localStorage.getItem('currentUser'));
				const data = await getUserData(currentUserId.currentUserId);
				// 取得token

				setInitialValues({
					id: data.id,
					name: data.name,
					account: data.account,
					avatar: data.avatar,
					introduction: data.introduction,
				});
			} catch (error) {
				console.error(error);
			}
		};
		getUsersInfo();
	}, [navigate]);

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
					{currentPath === '/user/other' ? (
						<div className={style.otherUserButtons}>
							<div
								className={
									messageClicked
										? `${style.messageBox} ${style.messageBoxClicked}`
										: style.messageBox
								}
								onClick={() => setMessageClicked(!messageClicked)}
							>
								{messageClicked ? (
									<MessageFilled className={style.messageFilled} />
								) : (
									<MessageOutline className={style.messageOutline} />
								)}
							</div>
							<div
								className={notiClicked ? `${style.notiBox} ${style.notiBoxClicked}` : style.notiBox}
								onClick={() => setNotiClicked(!notiClicked)}
							>
								{notiClicked ? (
									<NotiFilled className={style.notiFilled} />
								) : (
									<NotiOutline className={style.notiOutline} />
								)}
							</div>
							<ButtonS text='正在追隨' className={style.followButton} />
						</div>
					) : (
						<ButtonSW text='編輯個人資料' path={'/user/self/edit'} />
					)}
				</div>
				<div className={style.userProfileInfoWrapper}>
					<div className={style.userProfileNameWrapper}>
						<h5 className={style.userProfileName}>{initialValues.name}</h5>
						<div className={style.userProfileSubName}>@{initialValues.account}</div>
					</div>
					<p className={style.userProfileIntro}>{initialValues.introduction}</p>
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
					{activeTab === 'tweetList' && <TweetList tab='tweetList' />}
					{activeTab === 'replyPost' && <ReplyList tab='replyPost' />}
					{activeTab === 'likeList' && <TweetList tab='likeList' />}
				</div>
			</div>
		</MainSection>
	);
};
