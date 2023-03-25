import axios from 'axios';

const baseUrl = 'https://quiet-fortress-55098.herokuapp.com/api';

// 測試用待刪
// const token = localStorage.getItem('token');
// console.log('token: ', token);

// 前台取得所有推文
// export const getTweets = async () => {
// 	try {
// 		const res = await axios.get(`${baseUrl}/admin/tweets`, {
// 			headers: {
// 				Authorization: 'Bearer ' + token,
// 			},
// 		});
// 		return res.data.data.tweetsData;
// 	} catch (error) {
// 		console.error('[Get Tweets Failed]:', error);
// 		return { success: false };
// 	}
// };

// 使用者可以編輯自己的資料(setting)
// export const putUserProfile = async (payload) => {
// 	const { name, account, email, introduction } = payload;
// 	try {
// 		const res = await axios.put(`${baseUrl}/users/${id}`, { name, account, email, introduction });
// 		return res.data;
// 	} catch (error) {
// 		console.log(`[Put Data Failed]:`, error);
// 	}
// };
