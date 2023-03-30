import axios from 'axios';

const baseUrl = 'https://quiet-fortress-55098.herokuapp.com/api';

// 測試用待刪
// const token = localStorage.getItem('token');
// console.log('token: ', token);

// 後台取得所有推文
export const getAdminTweets = async () => {
	try {
		const token = localStorage.getItem('token');
		const res = await axios.get(`${baseUrl}/admin/tweets`, {
			headers: {
				Authorization: 'Bearer ' + token,
			},
		});
		return res.data.data.tweetsData;
	} catch (error) {
		console.error('[Get Tweets Failed]:', error);
		console.log('error.response.data.message: ', error.response.data.message);

		return { success: false };
	}
};

// 後台取得所有使用者
export const getAdminUsers = async () => {
	const token = localStorage.getItem('token');
	try {
		const res = await axios.get(`${baseUrl}/admin/users`, {
			headers: {
				Authorization: 'Bearer ' + token,
			},
		});

		return res.data;
	} catch (error) {
		console.error('[Get User Failed]:', error);
		return { success: false };
	}
};

// 後台刪除所單一推文
export const deleteAdminTweet = async (id) => {
	const token = localStorage.getItem('token');
	try {
		const res = await axios.delete(`${baseUrl}/admin/tweets/${id}`, {
			headers: {
				Authorization: 'Bearer ' + token,
			},
		});

		return res.data;
	} catch (error) {
		console.error('[Delete User Failed]:', error);
	}
};
