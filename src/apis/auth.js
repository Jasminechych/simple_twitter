import axios from 'axios';

const baseUsl = 'https://quiet-fortress-55098.herokuapp.com/';

export const adminSignIn = async ({ account, password }) => {
	try {
		const { data } = await axios.post(`${baseUsl}/admin/signin`, { account, password });
		const token = { data };

		if (token) {
			return { success: true, ...data };
		}

		return data;
	} catch (error) {
		console.error('[Login Failed]:', error);
		return { success: false };
	}
};
