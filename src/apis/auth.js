import axios from 'axios';

const baseUrl = 'https://quiet-fortress-55098.herokuapp.com/api';

export const adminSignIn = async ({ account, password }) => {
	try {
		const { data } = await axios.post(`${baseUrl}/admin/signin`, { account, password });

		const token = { data };
		console.log(token);
		if (token) {
			return { success: true, ...data };
		}

		return data;
	} catch (error) {
		console.error('[Login Failed]:', error);
		return { success: false };
	}
};
