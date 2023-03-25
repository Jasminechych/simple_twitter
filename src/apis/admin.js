import axios from 'axios';

const baseUrl = 'https://quiet-fortress-55098.herokuapp.com/api';

const token = localStorage.getItem('token');
console.log('token: ', token);

export const getAdminTweets = async () => {
	try {
		const res = await axios.get(`${baseUrl}/admin/tweets`, {
			headers: {
				Authorization: 'Bearer ' + token,
			},
		});
		return res.data.data.tweetsData;
	} catch (error) {
		console.error('[Get User Failed]:', error);
		return { success: false };
	}
};

export const getAdminUsers = async () => {
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
