import { useEffect, useState } from 'react';
import { getUserData, putSetting } from 'src/apis/user.js';
import style from 'src/components/Setting/Setting.module.scss';
import { AuthInput } from '../AuthInput/AuthInput';
import { ButtonM } from '../buttons';
import { Header } from '../Header/Header';
import { MainSection } from '../MainSection/MainSection';
import Swal from 'sweetalert2';

export const Setting = () => {
	const current = JSON.parse(localStorage.getItem('currentUser'));
	console.log('setting page current: ', current);

	//輸入時同步取得
	const [account, setAccount] = useState('');
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	// 	取使用者自己的資料
	const [initialValues, setInitialValues] = useState({
		id: current.currentUserId,
		account: current.currentUserAccount,
		name: current.currentUserName,
		email: current.currentUserEmail,
	});
	console.log('initialValues:', initialValues);

	// 取得
	useEffect(() => {
		const getUsersInfo = async () => {
			const currentUserId = JSON.parse(localStorage.getItem('currentUser'));
			console.log('currentUserId: ', currentUserId.currentUserId);
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

	const handleSave = async (id) => {
		// 先判斷輸入的內容長度不為0
		if (
			!account.trim().length ||
			!name.trim().length ||
			!email.trim().length ||
			!password.trim().length
		) {
			return;
		}

		const response = await putSetting({ id, name, account, email, password });

		if (response && response.data) {
			const { data } = response;
			// 進行對data的操作
			localStorage.setItem('token', data.token);
			Swal.fire({
				title: '儲存成功',
				icon: 'success',
				showConfirmButton: false,
				position: 'top',
				timer: 1000,
			});
			return;
		}
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
					onChange={(passwordInputValue) => setPassword(passwordInputValue)}
				/>
			</div>
			<div className={style.settingButton}>
				<ButtonM text='儲存' onSave={handleSave} />
			</div>
		</MainSection>
	);
};
