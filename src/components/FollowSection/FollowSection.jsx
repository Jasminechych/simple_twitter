// import { Link } from 'react-router-dom';
// import style from 'src/components/FollowSection/FollowerList/FollowerList.module.scss';
// import { Header } from 'src/components/Header/Header';
// import { MainSection } from 'src/components/MainSection/MainSection';
// import { ReactComponent as BackArrow } from 'src/assets/icons/back.svg';
// import { UserItem } from 'src/components/UserItem/UserItem';
// import { useEffect, useState } from 'react';
// import { getUsersFollowers, getsUsersFollowing } from 'src/apis/user';

// export const FollowerList = ({ name, tweets }) => {
// 	const currentUserId = JSON.parse(localStorage.getItem('currentUser')).currentUserId;
// 	const [usersFollowersData, setUsersFollowersData] = useState([]);
// 	const [usersFollowingsData, setUsersFollowingsData] = useState([]);

// 	const [isDataLoaded, setIsDataLoaded] = useState(false);

// 	// 取得目前使用者的跟隨者
// 	useEffect(() => {
// 		const getUsersFollowersAsync = async () => {
// 			try {
// 				const followersData = await getUsersFollowers(currentUserId);
// 				setUsersFollowersData(followersData);
// 				console.log('getUsersFollowers: ', usersFollowersData);
// 				const followingData = await getsUsersFollowing(currentUserId);
// 				setUsersFollowingsData(followingData);
// 				setIsDataLoaded(true);
// 			} catch (error) {
// 				console.log(error);
// 			}
// 		};
// 		getUsersFollowersAsync();
// 	}, []);

// 	// 比對目前使用者有無跟隨跟隨者
// 	const comparedData = usersFollowersData.map((follower) => {
// 		console.log('follower: ', follower);
// 		const isMatch = usersFollowingsData.some(
// 			(following) => follower.followerId === following.followingId,
// 		);

// 		if (isMatch) {
// 			return {
// 				...follower,
// 				matched: true,
// 			};
// 		} else {
// 			return follower;
// 		}
// 	});

// 	return (
// 		<MainSection>
// 			<div className={style.followHeaderWrapper}>
// 				<Link to='/user/self'>
// 					<BackArrow className={style.backArrow} />
// 				</Link>
// 				<div className={style.followHeader}>
// 					<Header header={name} className={style.header} />
// 					<a href='' className={style.tweets}>{`${tweets}推文`}</a>
// 				</div>
// 			</div>
// 			<div className={style.followerListContainer}>
// 				<div className={style.followTabWrapper}>
// 					<div className={style.followerListTitle}>追隨者</div>
// 					<Link to='/following' className={style.followingListTitle}>
// 						正在追隨
// 					</Link>
// 				</div>
// 				<div className={style.userItemWrapper}>
// 					{isDataLoaded ? (
// 						comparedData.map(({ Follower }) => {
// 							return (
// 								<UserItem
// 									key={Follower.id}
// 									id={Follower.id}
// 									name={Follower.name}
// 									avatar={Follower.avatar}
// 									description={Follower.introduction}
// 									isFollowing={matched}
// 								/>
// 							);
// 						})
// 					) : (
// 						<h5>loading...</h5>
// 					)}
// 				</div>
// 			</div>
// 		</MainSection>
// 	);
// };
