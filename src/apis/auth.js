import axios from 'axios';

const baseUrl = 'https://quiet-fortress-55098.herokuapp.com/api';

// export const adminSignIn = async ({ account, password }) => {
// 	try {
// 		const { data } = await axios.post(`${baseUrl}/admin/signin`, { account, password });
// 		const token = { data };

// 		if (token) {
// 			return { success: true, ...data };
// 		}
// 		console.log('ok');

// 		return data;
// 	} catch (error) {
// 		console.error('[Login Failed]:', error);
// 		return { success: false };
// 	}
// };

// let config = {
// 	url,
// 	method: 'post',
// 	headers: {
// 		'Access-Control-Allow-Origin': '*',
// 		'Access-Control-Allow-Headers': '*',
// 		'Access-Control-Allow-Credentials': 'true',
// 	},
// };
// let response = await this.axios.request(config);

export const adminSignIn = async ({ account, password }) => {
	try {
		const config = {
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Headers': '*',
				'Access-Control-Allow-Credentials': 'true',
			},
		};
		const { data } = await axios.post(
			`${baseUrl}/admin/signin`,
			{ account, password },
			config, // 添加第三个参数
		);
		const token = { data };

		if (token) {
			return { success: true, ...data };
		}
		console.log('ok');

		return data;
	} catch (error) {
		console.error('[Login Failed]:', error);
		return { success: false };
	}
};
