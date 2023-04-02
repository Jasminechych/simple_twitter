import style from 'src/components/UserProfile/UserProfile.module.scss';
import { ButtonS, ButtonSW } from 'src/components/buttons';
import { MainSection } from 'src/components/MainSection/MainSection';
import { Header } from 'src/components/Header/Header';
import { useNavigate, useParams } from 'react-router-dom';
import { ReactComponent as BackArrow } from 'src/assets/icons/back.svg';
import { TweetList } from 'src/components/TweetList/TweetList';
import { useEffect, useState, useCallback } from 'react';
import { ReplyList } from 'src/components/ReplyList/ReplyList';
import { UserProfileTab } from 'src/components/UserProfileTab/UserProfileTab';
import { LikeList } from 'src/components/LikeList/LikeList';
import {
	getUserData,
	getUserTweets,
	getUserRepliedTweets,
	getUserLikes,
	getUsersFollowers,
	getsUsersFollowing,
	postLikeTweet,
	postUnLikeTweet,
} from 'src/apis/user';
import { MessageFilled, MessageOutline, NotiFilled, NotiOutline } from 'src/assets/icons';
import defaultAvatar from 'src/assets/icons/man-avatar.svg';
import defaultCover from 'src/assets/icons/background-photo.svg';

export const UserProfile = () => {
	// 目前登入的使用者 ID
	const currentUserId = JSON.parse(localStorage.getItem('currentUser')).currentUserId;
	// 目前使用者喜歡的推文內容
	// const [currentUserLikeData, setCurrentLikeData] = useState([]);

	// 要顯示的使用者的資料
	const [userData, setUserData] = useState({});
	// 要顯示的使用者的所有推文
	const [userTweetsData, setUserTweetsData] = useState([]);
	// 要顯示的使用者回覆過的所有推文
	const [userRepliedData, setUserRepliedData] = useState([]);
	// 要顯示的使用者喜歡過的推文
	const [userLikeData, setUserLikeData] = useState([]);
	// 要顯示的使用者的跟隨者
	const [usersFollowersData, setUsersFollowersData] = useState([]);
	// 要顯示的使用者跟隨的人
	const [usersFollowingsData, setUsersFollowingsData] = useState([]);
	// 設定資料都裝載完成
	const [isFetchUserProfileDataLoaded, setIsFetchUserProfileDataLoaded] = useState(false);

	// 正在的使用者資料分頁
	const [activeTab, setActiveTab] = useState('tweetList');
	console.log('activeTab', activeTab);

	// 目前要查看的 user ID
	const { id } = useParams();
	const navigate = useNavigate();

	// 設定按讚
	const [isLikingOrUnLiking, setIsLikingOrUnLiking] = useState({ id: '', likeOrUnlike: '' });
	const [isHeartClick, setIsHeartClick] = useState(false);

	const [messageClicked, setMessageClicked] = useState(false);
	const [notiClicked, setNotiClicked] = useState(false);
	// const [avatarClick, setAvatarClick] = useState(false);

	useEffect(() => {
		const fetchUserProfileAsync = async () => {
			// 先驗證token，若無則直接回到signin
			const token = localStorage.getItem('token');
			if (!token) {
				navigate('/signin', { replace: true });
				return;
			}
			try {
				// 取得要顯示的使用者的資料
				const getUserDataData = await getUserData(id);
				setUserData(getUserDataData);
				// console.log('getUserDataData', getUserDataData);

				// 取得要顯示的使用者的跟隨者
				const getUsersFollowersData = await getUsersFollowers(id);
				setUsersFollowersData(getUsersFollowersData);
				console.log('getUsersFollowersData', getUsersFollowersData);

				// 取得要顯示的使用者跟隨的人
				const getsUsersFollowingData = await getsUsersFollowing(id);
				setUsersFollowingsData(getsUsersFollowingData);
				console.log('getsUsersFollowingData', getsUsersFollowingData);

				if (activeTab === 'tweetList') {
					// 取得要顯示的使用者的所有推文
					const getUserTweetsData = await getUserTweets(id);
					// 取得目前登入的使用者喜歡過的推文比對有沒有愛心
					const getCurrentUserLikeData = await getUserLikes(currentUserId);
					setUserTweetsData(
						getUserTweetsData.map((user) => {
							const isLiked = getCurrentUserLikeData.some((data) => data.TweetId === user.id);
							if (isLiked) {
								return {
									...user,
									isLikeByUser: true,
								};
							} else {
								return user;
							}
						}),
					);
					console.log('比對完成');
					setIsFetchUserProfileDataLoaded(true);
					return;
				}
				if (activeTab === 'replyList') {
					// 取得要顯示的使用者回覆過的所有推文
					setUserRepliedData([]);
					const getUserRepliedTweetsData = await getUserRepliedTweets(id);
					setUserRepliedData(getUserRepliedTweetsData);
					console.log('getUserRepliedTweetsData', getUserRepliedTweetsData);
					setIsFetchUserProfileDataLoaded(true);
					return;
				}

				if (activeTab === 'likeList') {
					// 取得要顯示的使用者喜歡過的推文
					const getUserLikesData = await getUserLikes(id);
					// 取得目前登入的使用者喜歡過的推文比對有沒有愛心
					const getCurrentUserLikeData = await getUserLikes(currentUserId);
					setUserLikeData(
						getUserLikesData.map((user) => {
							const isLiked = getCurrentUserLikeData.some((data) => data.TweetId === user.TweetId);
							if (isLiked) {
								return {
									...user,
									isLikeByUser: true,
								};
							} else {
								return user;
							}
						}),
					);
					console.log('getUserLikesData', getUserLikesData);
					setIsFetchUserProfileDataLoaded(true);
					return;
				}
			} catch (error) {
				console.error(error);
			}
		};
		fetchUserProfileAsync();
	}, [activeTab, id, isHeartClick]);

	// 對貼文按愛心或取消愛心
	const handleHeartClick = useCallback((id, likeOrUnlike) => {
		console.log('profile heart click', id, likeOrUnlike);
		setIsFetchUserProfileDataLoaded(false);

		setIsLikingOrUnLiking((prev) => {
			return { ...prev, id: id, likeOrUnlike: likeOrUnlike };
		});
	}, []);

	useEffect(() => {
		const postLikeOrUnlikeTweetAsync = async () => {
			try {
				// 按愛心
				if (isLikingOrUnLiking.id !== '') {
					if (isLikingOrUnLiking.likeOrUnlike === 'like') {
						await postLikeTweet(isLikingOrUnLiking.id);
						setIsHeartClick(!isHeartClick);
						return;
					} else {
						// 取消愛心
						await postUnLikeTweet(isLikingOrUnLiking.id);
						setIsHeartClick(!isHeartClick);
					}
				}
			} catch (error) {
				console.error(error);
			}
		};
		postLikeOrUnlikeTweetAsync();
	}, [isLikingOrUnLiking]);

	// 點擊頭像連到個人頁面
	const handleAvatarClick = (avatarId) => {
		console.log('avatar click id: ', avatarId);
		navigate(`/user/${avatarId}`);
	};

	return (
		<MainSection>
			{isFetchUserProfileDataLoaded ? (
				<>
					<div className={style.userProfileHeaderWrapper}>
						<BackArrow className={style.backArrow} onClick={() => navigate('/main')} />
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
							{/* 非當前登入使用者才顯示 */}
							{id.toString() !== currentUserId.toString() && (
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
									{/* 小鈴鐺 */}
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
							)}

							{/* 當前使用者才能顯示編輯個人資料 */}
							{id.toString() === currentUserId.toString() && (
								<ButtonSW text='編輯個人資料' path={'/user/self/edit'} />
							)}
						</div>
						<div className={style.userProfileInfoWrapper}>
							<div className={style.userProfileNameWrapper}>
								<h5 className={style.userProfileName}>{userData.name}</h5>
								<div className={style.userProfileSubName}>@{userData.account}</div>
							</div>
							{/* 新註冊者可能沒有自我介紹給空字串 */}
							<p className={style.userProfileIntro}>{userData.introduction || ''}</p>
							<div className={style.userProfileFollowInfoWrapper}>
								<div className={style.userProfileFollowing}>
									{usersFollowingsData.length}
									<p onClick={() => navigate(`/user/${id}/following`)}>個跟隨中</p>
								</div>
								<div className={style.userProfileFollower}>
									{usersFollowersData.length}
									<p onClick={() => navigate(`/user/${id}/follower`)}>位跟隨者</p>
								</div>
							</div>
						</div>
						{/* tab */}
						<div className={style.tabContainer}>
							<UserProfileTab
								title='推文'
								className={activeTab === 'tweetList' ? style.active : style.tab}
								handleTabChange={() => setActiveTab('tweetList')}
							/>
							<UserProfileTab
								title='回覆'
								className={activeTab === 'replyList' ? style.active : style.tab}
								handleTabChange={() => setActiveTab('replyList')}
							/>
							<UserProfileTab
								title='喜歡的內容'
								className={activeTab === 'likeList' ? style.active : style.tab}
								handleTabChange={() => setActiveTab('likeList')}
							/>
						</div>
						{/* tab 要顯示的元件 */}
						<div>
							{activeTab === 'tweetList' && (
								<TweetList data={userTweetsData} handleHeartClick={handleHeartClick} />
							)}
							{activeTab === 'replyList' && (
								<ReplyList data={userRepliedData} userData={userData} />
							)}
							{activeTab === 'likeList' && (
								<LikeList
									data={userLikeData}
									handleHeartClick={handleHeartClick}
									handleAvatarClick={handleAvatarClick}
								/>
							)}
						</div>
					</div>
				</>
			) : (
				<h5>loading...</h5>
			)}
		</MainSection>
	);
};
