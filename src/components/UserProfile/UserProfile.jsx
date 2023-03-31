import style from 'src/components/UserProfile/UserProfile.module.scss';
import { ButtonS, ButtonSW } from 'src/components/buttons';
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
import {
	getUserData,
	getUserTweets,
	// getUserRepliedTweets,
	// getUserLikes,
	getUsersFollowers,
	getsUsersFollowing,
} from 'src/apis/user';
import { MessageFilled, MessageOutline, NotiFilled, NotiOutline } from 'src/assets/icons';
// import { useUserData } from 'src/context/UserContext';
import defaultAvatar from 'src/assets/icons/man-avatar.svg';
import defaultCover from 'src/assets/icons/background-photo.svg';

export const UserProfile = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const currentPath = location.pathname;
	// const current = JSON.parse(localStorage.getItem('currentUser'));
	const [activeTab, setActiveTab] = useState('tweetList');
	const [messageClicked, setMessageClicked] = useState(false);
	const [notiClicked, setNotiClicked] = useState(false);

	// 把使用者資料拿出來用
	// const { currentUserInfo, usersFollowersData, usersFollowingsData, usersTweets } = useUserData();
	// console.log('currentUserInfo:', currentUserInfo);
	// console.log('usersTweets', usersTweets);

	// 先驗證token，若無則直接回到signin
	const token = localStorage.getItem('token');
	if (!token) {
		navigate('/signin', { replace: true });
		return;
	}

	const handleTabChange = (tab) => {
		setActiveTab(tab);
	};
	// 	使用者取得自己的資料
	// const [initialValues, setInitialValues] = useState({
	// 	id: current.currentUserId,
	// 	name: current.currentUserName,
	// 	cover: current.currentUserCover,
	// 	account: current.currentUserAccount,
	// 	avatar: current.currentUserAvatar,
	// 	introduction: current.currentUserIntroduction,
	// });
	// console.log('initialValues:', initialValues);

	// 取得
	// useEffect(() => {
	// 	const getUsersInfo = async () => {
	// 		try {
	// 			const token = localStorage.getItem('token');

	// 			// 先驗證token，若無則直接回到signin
	// 			if (!token) {
	// 				navigate('/signin', { replace: true });
	// 				return;
	// 			}
	// 			const currentUserId = JSON.parse(localStorage.getItem('currentUser'));
	// 			const data = await getUserData(currentUserId.currentUserId);
	// 			// 取得token

	// 			setInitialValues({
	// 				id: data.id,
	// 				name: data.name,
	// 				account: data.account,
	// 				avatar: data.avatar,
	// 				cover: data.cover,
	// 				introduction: data.introduction,
	// 			});
	// 		} catch (error) {
	// 			console.error(error);
	// 		}
	// 	};
	// 	getUsersInfo();
	// }, [navigate]);

	// ＊＊＊＊＊ 以下為暫時新增，需要整個重構頁面資料跟路由 ＊＊＊＊＊ //

	// 目前登入的使用者
	const currentUserId = JSON.parse(localStorage.getItem('currentUser')).currentUserId;
	// 要顯示的使用者資料
	const [userData, setUserData] = useState({
		id: '',
		name: '',
		cover: '',
		account: '',
		avatar: '',
		introduction: '',
	});
	// console.log('userData:', userData);

	// 要顯示的使用者回覆過的內容
	const [userTweetsData, setUserTweetsData] = useState([]);

	// 要顯示的使用者回覆過的內容
	// const [userRepliedData, setUserRepliedData] = useState([]);

	//  要顯示的使用者喜歡的內容
	// const [userLikeData, setUserLikeData] = useState([]);

	// 要顯示的使用者的跟隨者
	const [usersFollowersData, setUsersFollowersData] = useState([]);

	// 要顯示的使用者跟隨的人
	const [usersFollowingsData, setUsersFollowingsData] = useState([]);

	// 設定資料都裝載完成
	const [isDataLoaded, setIsDataLoaded] = useState(false);

	useEffect(() => {
		const fetchUserProfileAsync = async () => {
			try {
				// 取得 userId 的使用者資料
				// id 先頂用待改
				const data = await getUserData(currentUserId);
				setUserData({
					id: data.id,
					name: data.name,
					account: data.account,
					avatar: data.avatar,
					cover: data.cover,
					introduction: data.introduction,
				});

				// 取得要顯示的使用者的所有推文
				// id 先頂用待改
				const tweetData = await getUserTweets(currentUserId);
				setUserTweetsData(tweetData);

				// 取得要顯示的使用者回覆過的所有推文
				// id 先頂用待改
				// const repliedData = await getUserRepliedTweets(currentUserId);
				// setUserRepliedData(repliedData);

				// 取得要顯示的使用者喜歡過的推文
				// id 先頂用待改
				// const likeData = await getUserLikes(currentUserId);
				// setUserLikeData(likeData);

				// 取得要顯示的使用者的跟隨者
				// id 先頂用待改
				const followersData = await getUsersFollowers(currentUserId);
				setUsersFollowersData(followersData);

				// 取得要顯示的使用者跟隨的人
				// id 先頂用待改
				const followingData = await getsUsersFollowing(currentUserId);
				setUsersFollowingsData(followingData);

				// 所有資料載入完成
				setIsDataLoaded(true);
			} catch (error) {
				console.error(error);
			}
		};
		fetchUserProfileAsync();
	}, []);
	// ＊＊＊＊＊ 以上為暫時新增，需要整個重構頁面資料跟路由 ＊＊＊＊＊ //

	return (
		<MainSection>
			{isDataLoaded ? (
				<>
					<div className={style.userProfileHeaderWrapper}>
						<Link to='/main'>
							<BackArrow className={style.backArrow} />
						</Link>
						<div className={style.userHeader}>
							<Header header={userData.name} className={style.header} />
							<a href='' className={style.tweets}>{`${userTweetsData.length}推文`}</a>
						</div>
					</div>
					<div className={style.userProfileContainer}>
						<div className={style.userProfileBackgroundPhoto}>
							<img src={userData.cover || defaultCover} className={style.cover} />
						</div>
						<div className={style.userProfileAvatar}>
							<img src={userData.avatar || defaultAvatar} className={style.avatar} />
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
										className={
											notiClicked ? `${style.notiBox} ${style.notiBoxClicked}` : style.notiBox
										}
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
								<h5 className={style.userProfileName}>{userData.name}</h5>
								<div className={style.userProfileSubName}>@{userData.account}</div>
							</div>
							<p className={style.userProfileIntro}>{userData.introduction || ''}</p>
							<div className={style.userProfileFollowInfoWrapper}>
								<div className={style.userProfileFollowing}>
									{usersFollowingsData.length}
									<Link to='/following'>個跟隨中</Link>
								</div>
								<div className={style.userProfileFollower}>
									{usersFollowersData.length}
									<Link to='/follower'>位跟隨者</Link>
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
				</>
			) : (
				<h5>loading...</h5>
			)}
		</MainSection>
	);
};
