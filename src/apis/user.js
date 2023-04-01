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

// 使用者可以設定自己的資料
// 裡面是需要被更新的資料
export const putUserData = async (
	id,
	{ name, account, email, password, checkPassword, introduction },
) => {
	const token = localStorage.getItem('token');

	console.log('id: ', id);

	try {
		const res = await axios.put(
			`${baseUrl}/users/${id}`,
			{ name, account, email, password, checkPassword, introduction },
			{
				headers: {
					Authorization: 'Bearer ' + token,
				},
			},
		);
		console.log('後台獲得的res:', res);
		return res;
	} catch (error) {
		console.log(`[Put Setting Failed]:`, error);
		const errorMessage = error.response.data.message;
		return { success: false, errorMessage };
	}
};

// 編輯個人資料
export const getEditProfile = async (id, { name, avatar, cover, introduction }) => {
	const token = localStorage.getItem('token');
	console.log('前台更新的cover:', cover);
	try {
		const formData = new FormData();
		formData.append('name', name);
		formData.append('avatar', avatar);
		formData.append('cover', cover);
		formData.append('introduction', introduction);

		const response = await axios.put(`${baseUrl}/users/${id}/profile`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
				Authorization: 'Bearer ' + token,
			},
		});
		console.log('後台的res:', response);
		return response;
	} catch (error) {
		console.error(`[Put EditProfile Failed]:`, error);
	}
};

//使用者可以取得自己的資料
export const getUserData = async (id) => {
	const token = localStorage.getItem('token');
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
	const token = localStorage.getItem('token');
	// console.log('token: ', token);
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

// api/users/:id/followings 查看此使用者ID追蹤中的人
export const getsUsersFollowing = async (id) => {
	const token = localStorage.getItem('token');
	// console.log('token: ', token);
	try {
		const res = await axios.get(`${baseUrl}/users/${id}/followings`, {
			headers: {
				Authorization: 'Bearer ' + token,
			},
		});
		return res.data;
	} catch (error) {
		console.error('[Get users followings Failed]:', error.reponse);
	}
};

// api/followships 追蹤某位使用者
export const postFollowShips = async (id) => {
	const token = localStorage.getItem('token');
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
		console.log(res.data);
		return res.data;
	} catch (error) {
		console.error('[Post Follow Ships Failed]:', error.response);
	}
};

// api/followships/:followingId 取消追蹤某位使用者
export const deleteFollowShips = async (id) => {
	const token = localStorage.getItem('token');
	try {
		const res = await axios.delete(`${baseUrl}/followships/${id}`, {
			headers: {
				Authorization: 'Bearer ' + token,
			},
		});
		console.log(res.data);
		return res.data;
	} catch (error) {
		console.error('[Delete Follow Ships Failed]:', error.response);
	}
};

// 查看所有推文
export const getTweets = async () => {
	const token = localStorage.getItem('token');
	// console.log('token: ', token);
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
	const token = localStorage.getItem('token');
	// console.log('token: ', token);
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
	const token = localStorage.getItem('token');
	try {
		const res = await axios.get(`${baseUrl}/users/${id}/likes`, {
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
	const token = localStorage.getItem('token');
	// console.log('token: ', token);
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

// api/tweets/:id/like  喜歡某則貼文
export const postLikeTweet = async (id) => {
	const token = localStorage.getItem('token');
	try {
		const res = await axios.post(`${baseUrl}/tweets/${id}/like`, null, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return res.data;
	} catch (error) {
		console.error('[Post Tweet like Failed]:', error.response);
	}
};

// api/tweets/:id/unlike  取消喜歡某則貼文
export const postUnLikeTweet = async (id) => {
	const token = localStorage.getItem('token');
	try {
		const res = await axios.post(`${baseUrl}/tweets/${id}/unlike`, null, {
			headers: {
				Authorization: 'Bearer ' + token,
			},
		});
		return res.data;
	} catch (error) {
		console.error('[Get Tweet Unlike Failed]:', error.response);
	}
};

// api/users/:id/followers 查看追蹤此使用者ID的人
export const getUsersFollowers = async (id) => {
	const token = localStorage.getItem('token');
	try {
		const res = await axios.get(`${baseUrl}/users/${id}/followers`, {
			headers: {
				Authorization: 'Bearer ' + token,
			},
		});
		return res.data;
	} catch (error) {
		console.error('[Get Users Followers Failed]:', error.response);
	}
};

// api/tweets/:tweet_id/replies 在此id貼文下新增回復
export const postTweetReplies = async (id, comment) => {
	const token = localStorage.getItem('token');
	try {
		const res = await axios.post(
			`${baseUrl}/tweets/${id}/replies`,
			{ comment },
			{
				headers: {
					Authorization: 'Bearer ' + token,
				},
			},
		);
		return res.data;
	} catch (error) {
		console.error('[Post Tweet Replies Failed]:', error.response);
	}
};

// api/users/:id/replied_tweets 查看此使用者ID回覆過的貼文
export const getUserRepliedTweets = async (id) => {
	const token = localStorage.getItem('token');
	try {
		const res = await axios.get(`${baseUrl}/users/${id}/replied_tweets`, {
			headers: {
				Authorization: 'Bearer ' + token,
			},
		});
		return res.data;
	} catch (error) {
		console.error('[Get User Replied Tweets Failed]:', error.response);
	}
};

// api/users/:id/tweets 查看此使用者ID的推文
export const getUserTweets = async (id) => {
	const token = localStorage.getItem('token');
	try {
		const res = await axios.get(`${baseUrl}/users/${id}/tweets`, {
			headers: {
				Authorization: 'Bearer ' + token,
			},
		});
		return res.data;
	} catch (error) {
		console.error('[Get User Tweets Failed]:', error.response);
	}
};

// api/tweets 發推文
export const postTweets = async (userId, description) => {
	const token = localStorage.getItem('token');
	try {
		const res = await axios.post(
			`${baseUrl}/tweets`,
			{ userId, description },
			{
				headers: {
					Authorization: 'Bearer ' + token,
				},
			},
		);
		return res.data;
	} catch (error) {
		console.error('[Post Tweets Failed]:', error.response);
	}
};
