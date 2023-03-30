import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getUserData, getUsersFollowers, getsUsersFollowing, getUserTweets } from 'src/apis/user';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const currentUserId = JSON.parse(localStorage.getItem('currentUser')).currentUserId;

	// 取得目前使用者基本資料
	const [currentUserInfo, setCurrentUserInfo] = useState('');
	useEffect(() => {
		const getUserAsync = async () => {
			try {
				const data = await getUserData(currentUserId);
				setCurrentUserInfo(data);
				console.log('getUserData', data);
			} catch (error) {
				console.log(error);
			}
		};
		getUserAsync();
	}, []);

	// 取得目前使用者的跟隨者
	const [usersFollowersData, setUsersFollowersData] = useState([]);
	useEffect(() => {
		const getUsersFollowersAsync = async () => {
			try {
				const followersData = await getUsersFollowers(currentUserId);
				setUsersFollowersData(followersData);
			} catch (error) {
				console.log(error);
			}
		};
		getUsersFollowersAsync();
	}, []);

	// 查看此使用者ID追蹤中的人
	const [usersFollowingsData, setUsersFollowingsData] = useState([]);

	useEffect(() => {
		const getFollowingsUsersAsync = async () => {
			try {
				const data = await getsUsersFollowing(currentUserId);
				setUsersFollowingsData(data);
			} catch (error) {
				console.log(error);
			}
		};
		getFollowingsUsersAsync();
	}, []);

	// 取得目前使用者所有推文
	const [usersTweets, setUserTweets] = useState([]);
	useEffect(() => {
		const getUserTweetsAsync = async () => {
			try {
				const data = await getUserTweets(currentUserId);
				console.log('getsUsersFollowing: ', data);
				setUserTweets(data);
			} catch (error) {
				console.log(error);
			}
		};
		getUserTweetsAsync();
	}, []);

	// 如果沒有把它 memo 起來，一旦 CounterProvider re-render，其所有的
	// consumer 都會 re-render（即使 counter 沒有改變）
	const UserContextData = useMemo(() => {
		return {
			currentUserInfo,
			usersFollowersData,
			usersFollowingsData,
			usersTweets,
		};
	}, [currentUserInfo, usersFollowersData, usersFollowingsData]);

	return <UserContext.Provider value={UserContextData}>{children}</UserContext.Provider>;
};

// 使用
export const useUserData = () => {
	const UserContextData = useContext(UserContext);

	// 確保 counterContext 不會是空的
	if (UserContextData === undefined) {
		throw new Error('UserContext must be used within a CounterProvider');
	}

	return UserContextData;
};
