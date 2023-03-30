import axios from 'axios';

const baseUrl = 'https://quiet-fortress-55098.herokuapp.com/api';

// 後台登入
export const adminSignIn = async ({ account, password }) => {
	try {
		const { data } = await axios.post(`${baseUrl}/admin/signin`, { account, password });

		const token = data.data.token;

		if (token) {
			return { success: true, ...data };
		}

		return data;
	} catch (error) {
		console.log('error.response.data.message: ', error.response.data.message);
		console.error('[Login Failed]:', error.response);
		const errorMessage = error.response.data.message;
		return { success: false, errorMessage };
	}
};

// 使用者登入
export const userSignIn = async ({ account, password }) => {
	try {
		const { data } = await axios.post(`${baseUrl}/users/signin`, { account, password });
		const token = data.data.token;

		if (token) {
			return { success: true, ...data };
		}

		return data;
	} catch (error) {
		console.error('[Login Failed]:', error.response);
		const errorMessage = error.response.data.message;
		console.log('auth 的errorMessage:', errorMessage);
		return { success: false, errorMessage };
	}
};

// 使用者註冊
export const register = async ({ name, account, email, password, checkPassword }) => {
	try {
		const { data } = await axios.post(`${baseUrl}/users`, {
			name,
			account,
			email,
			password,
			checkPassword,
		});
		const token = data.data.token;

		if (token) {
			return { success: true, ...data };
		}

		return data;
	} catch (error) {
		console.error('[Login Failed]:', error.response);
		const errorMessage = error.response.data.message;
		return { success: false, errorMessage };
	}
};
