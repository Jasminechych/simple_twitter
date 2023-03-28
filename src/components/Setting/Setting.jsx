import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserData, putUserData } from 'src/apis/user.js';
import style from 'src/components/Setting/Setting.module.scss';
import { AuthInput } from '../AuthInput/AuthInput';
import { ButtonM } from '../buttons';
import { Header } from '../Header/Header';
import { MainSection } from '../MainSection/MainSection';
// import Swal from 'sweetalert2';

export const Setting = () => {
	const current = JSON.parse(localStorage.getItem('currentUser'));
	// console.log('setting page current: ', current);

	//輸入時同步取得
	const [account, setAccount] = useState('');
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [checkPassword, setCheckPassword] = useState('');
	const [checkPasswordErrorMessage, setCheckPasswordErrorMessage] = useState('');
	const [emailErrorMessage, setEmailErrorMessage] = useState('');
	const navigate = useNavigate();

	// 	取使用者自己的資料
	const [initialValues, setInitialValues] = useState({
		id: current.currentUserId,
		account: current.currentUserAccount,
		name: current.currentUserName,
		email: current.currentUserEmail,
	});
	// console.log('initialValues:', initialValues);

	// 取得
	useEffect(() => {
		const getUsersInfo = async () => {
			const currentUserId = JSON.parse(localStorage.getItem('currentUser'));
			// console.log('currentUserId: ', currentUserId.currentUserId);

			// 取得token
			const token = localStorage.getItem('token');
			console.log('token:', token);

			// 先驗證token，若無則直接回到login
			if (!token) {
				navigate('/signin');
				return;
			}
			try {
				const data = await getUserData(currentUserId.currentUserId);
				setInitialValues({
					id: data.id,
					account: data.account,
					name: data.name,
					email: data.email,
				});
			} catch (error) {
				console.error(error);
			}
		};
		getUsersInfo();
	}, []);

	const handleSave = async () => {
		// 先判斷輸入的內容長度不為0
		if (
			!account.trim().length ||
			!name.trim().length ||
			!email.trim().length ||
			!password.trim().length ||
			!checkPassword.trim().length
		) {
			return;
		}
		// 密碼與確認密碼若不相符，防止表單送出
		if (password !== checkPassword) {
			setCheckPasswordErrorMessage('密碼不相符');
			return;
		}

		// 每次按下註冊按鈕時先清空所有錯誤訊息
		setCheckPasswordErrorMessage('');

		const { data, success, errorMessage } = await putUserData({
			name,
			account,
			email,
			password,
			checkPassword,
		});
		console.log('data:', data);

		// 如果 email 已被註冊，顯示錯誤訊息
		if (errorMessage === 'Error: 此信箱已被註冊') {
			setEmailErrorMessage('此信箱已被註冊');
		}
		if (success) {
			// 成功儲存使用者資料
			const currentUser = {
				currentUserId: data.userData.id,
				currentUserAccount: data.userData.account,
				currentUserName: data.userData.name,
				currentUserEmail: data.userData.email,
			};
			localStorage.setItem('token', data.token);
			localStorage.setItem('currentUser', JSON.stringify(currentUser));
		}

		// if (response && response.data) {
		// 	const { data } = response;
		// 	// 進行對data的操作
		// 	localStorage.setItem('token', data.token);
		// 	Swal.fire({
		// 		title: '儲存成功',
		// 		icon: 'success',
		// 		showConfirmButton: false,
		// 		position: 'top',
		// 		timer: 1000,
		// 	});
		// 	return;
		// }
	};

	return (
		<MainSection>
			<Header header='帳號設定' />
			<div className={style.settingAuthInputContainer}>
				<AuthInput
					label='帳號'
					title='account'
					type='text'
					value={initialValues.account}
					onChange={(accountInputValue) => setAccount(accountInputValue)}
				/>
				<AuthInput
					label='名稱'
					title='name'
					type='text'
					value={initialValues.name}
					onChange={(nameInputValue) => setName(nameInputValue)}
				/>
				<AuthInput
					label='Email'
					title='email'
					type='email'
					errorMessage={emailErrorMessage}
					value={initialValues.email}
					onChange={(emailInputValue) => setEmail(emailInputValue)}
				/>
				<AuthInput
					label='密碼'
					title='password'
					type='password'
					placeholder='請設定密碼'
					value={password}
					onChange={(passwordInputValue) => setPassword(passwordInputValue)}
				/>
				<AuthInput
					label='密碼確認'
					title='password'
					type='password'
					placeholder='請再次輸入密碼'
					value={password}
					errorMessage={checkPasswordErrorMessage}
					onChange={(checkPasswordInputValue) => setCheckPassword(checkPasswordInputValue)}
				/>
			</div>
			<div className={style.settingButton}>
				<ButtonM text='儲存' onSave={handleSave} />
			</div>
		</MainSection>
	);
};
