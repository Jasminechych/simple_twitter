import axios from 'axios';

const baseUrl = 'https://quiet-fortress-55098.herokuapp.com/api';

export const adminSignIn = async ({ account, password }) => {
	try {
		const { data } = await axios.post(`${baseUrl}/admin/signin`, { account, password });
		console.log('現在在打 api, data: ', data);
		console.log('現在在打 api, data.data.token: ', data.data.token);

		const token = data.data.token;

		if (token) {
			return { success: true, ...data };
		}

		console.log(token);
		return data;
	} catch (error) {
		console.error('[Login Failed]:', error);
		return { success: false };
	}
};
