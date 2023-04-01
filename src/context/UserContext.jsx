// import { createContext, useContext, useMemo, useState } from 'react';

// const UserContext = createContext();

// export const UserProvider = ({ children }) => {
// 	// 防止後台登入時錯誤
// 	const currentUser = JSON.parse(localStorage.getItem('currentUser'));
// 	if (!currentUser) {
// 		return <UserContext.Provider value={{}}>{children}</UserContext.Provider>;
// 	}

// 	const UserContextData = useMemo(() => {
// 		return {};
// 	}, []);

// 	return <UserContext.Provider value={UserContextData}>{children}</UserContext.Provider>;
// };

// // 使用
// export const useUserData = () => {
// 	const UserContextData = useContext(UserContext);

// 	// 確保 counterContext 不會是空的
// 	if (UserContextData === undefined) {
// 		throw new Error('UserContext must be used within a UserProvider');
// 	}

// 	return UserContextData;
// };
