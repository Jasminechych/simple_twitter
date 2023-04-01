import { createContext, useContext, useMemo, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
	// 防止後台登入時錯誤
	const currentUser = JSON.parse(localStorage.getItem('currentUser'));
	if (!currentUser) {
		return <UserContext.Provider value={{}}>{children}</UserContext.Provider>;
	}

	// 目前登入的使用者 ID
	const currentUserId = JSON.parse(localStorage.getItem('currentUser')).currentUserId;

	// 個人資料頁面要顯示的使用者 ID
	const [isShownUserInfo, setIsShownUserInfo] = useState(currentUserId);

	// 使用者的資料
	const [userData, setUserData] = useState({});

	// 使用者的所有推文
	const [userTweetsData, setUserTweetsData] = useState([]);

	// 使用者回覆過的內容
	const [userRepliedData, setUserRepliedData] = useState([]);

	// 使用者喜歡的內容
	const [userLikeData, setUserLikeData] = useState([]);

	// 使用者的跟隨者
	const [usersFollowersData, setUsersFollowersData] = useState([]);

	// 全站的所有推文
	const [tweetsData, setTweetsData] = useState([]);

	const UserContextData = useMemo(() => {
		return {
			currentUserId,
			isShownUserInfo,
			setIsShownUserInfo,
			userData,
			setUserData,
			userTweetsData,
			setUserTweetsData,
			userRepliedData,
			setUserRepliedData,
			userLikeData,
			setUserLikeData,
			usersFollowersData,
			setUsersFollowersData,
			// usersFollowingsData,
			// setUsersFollowingsData,
			// topTenList,
			// setTopTenList,
			tweetsData,
			setTweetsData,
			// isPopularListDataLoaded,
			// setIsPopularListDataLoaded,
		};
	}, [
		currentUserId,
		isShownUserInfo,
		setIsShownUserInfo,
		userData,
		setUserData,
		userTweetsData,
		setUserTweetsData,
		userRepliedData,
		setUserRepliedData,
		userLikeData,
		setUserLikeData,
		usersFollowersData,
		setUsersFollowersData,
		// usersFollowingsData,
		// setUsersFollowingsData,
		// topTenList,
		// setTopTenList,
		tweetsData,
		setTweetsData,
		// isPopularListDataLoaded,
		// setIsPopularListDataLoaded,
	]);

	return <UserContext.Provider value={UserContextData}>{children}</UserContext.Provider>;
};

// 使用
export const useUserData = () => {
	const UserContextData = useContext(UserContext);

	// 確保 counterContext 不會是空的
	if (UserContextData === undefined) {
		throw new Error('UserContext must be used within a UserProvider');
	}

	return UserContextData;
};
