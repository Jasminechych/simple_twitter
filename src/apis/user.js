import axios from 'axios';

const baseUrl = 'https://quiet-fortress-55098.herokuapp.com/api';

// 測試用待刪
const token = localStorage.getItem('token');
console.log('token: ', token);

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
export const putUserData = async (id) => {
	// payload會有這些資料
	try {
		const res = await axios.put(`${baseUrl}/users/${id}`, {
			headers: {
				Authorization: 'Bearer ' + token,
			},
		});
		return res.data;
	} catch (error) {
		console.log(`[Put Setting Failed]:`, error);
	}
};

//使用者可以取得自己的資料
export const getUserData = async (id) => {
	try {
		const res = await axios.get(`${baseUrl}/users/${id}`, {
			headers: {
				Authorization: 'Bearer ' + token,
			},
		});
		return res.data;
	} catch (error) {
		console.log(`[Get UserData Failed]:`, error);
	}
};

// 取得前十最多被追蹤的使用者
export const getTopTenUsers = async () => {
	try {
		const res = await axios.get(`${baseUrl}/users/top`, {
			headers: {
				Authorization: 'Bearer ' + token,
			},
		});
		return res.data;
	} catch (error) {
		console.error('[Get Top Ten Users Failed]:', error);
		return { success: false };
	}
};

// 查看自己追蹤中的使用者
export const getFollowingsUsers = async (id) => {
	try {
		const res = await axios.get(`${baseUrl}/users/${id}/followings`, {
			headers: {
				Authorization: 'Bearer ' + token,
			},
		});
		return res.data;
	} catch (error) {
		console.error('[Get Top Ten Users Failed]:', error);
		return { success: false };
	}
};

// 追蹤、取消追蹤使用者
export const postFollowShips = async (id) => {
	try {
		const res = await axios.post(
			`${baseUrl}/followships`,
			{ id },
			{
				headers: {
					Authorization: 'Bearer ' + token,
				},
			},
		);
		console.log(res);
		return res;
	} catch (error) {
		console.error('[Get Follow Ships Failed]:', error);
		return { success: false };
	}
};

// 查看所有推文
export const getTweets = async () => {
	try {
		const res = await axios.get(`${baseUrl}/tweets`, {
			headers: {
				Authorization: 'Bearer ' + token,
			},
		});
		return res.data;
	} catch (error) {
		console.error('[Get Tweets Failed]:', error);
		return { success: false };
	}
};

// 查看一篇推文
export const getOneTweet = async (id) => {
	try {
		const res = await axios.get(`${baseUrl}/tweets/${id}`, {
			headers: {
				Authorization: 'Bearer ' + token,
			},
		});
		return res.data;
	} catch (error) {
		console.error('[Get One Tweets Failed]:', error);
	}
};

// api/users/:id/likes 查看喜歡過的貼文
export const getUserLikes = async (id) => {
	try {
		const res = await axios.get(`${baseUrl}/tweets/${id}`, {
			headers: {
				Authorization: 'Bearer ' + token,
			},
		});
		return res.data;
	} catch (error) {
		console.error('[Get User Likes Failed]:', error);
	}
};

// api/tweets/:tweet_id/replies 找出此貼文id的所有回復
export const getTweetReplies = async (id) => {
	try {
		const res = await axios.get(`${baseUrl}/tweets/${id}/replies`, {
			headers: {
				Authorization: 'Bearer ' + token,
			},
		});
		return res.data;
	} catch (error) {
		console.error('[Get Tweet Replies Failed]:', error);
	}
};
