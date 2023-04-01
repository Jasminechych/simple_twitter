import { createContext, useContext, useMemo, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
	// 防止後台登入時錯誤
	const currentUser = JSON.parse(localStorage.getItem('currentUser'));
	if (!currentUser) {
		return <UserContext.Provider value={{}}>{children}</UserContext.Provider>;
	}

	// const currentUserId = JSON.parse(localStorage.getItem('currentUser')).currentUserId;

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

	// 使用者跟隨的人
	const [usersFollowingsData, setUsersFollowingsData] = useState([]);

	// 全站排名前十被追蹤清單
	const [topTenList, setTopTenList] = useState([]);

	// 全站的所有推文
	const [tweetsData, setTweetsData] = useState([]);

	const UserContextData = useMemo(() => {
		return {
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
			usersFollowingsData,
			setUsersFollowingsData,
			topTenList,
			setTopTenList,
			tweetsData,
			setTweetsData,
		};
	}, [
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
		usersFollowingsData,
		setUsersFollowingsData,
		topTenList,
		setTopTenList,
		tweetsData,
		setTweetsData,
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
