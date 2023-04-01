import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserData, putUserData } from 'src/apis/user.js';
import style from 'src/components/Setting/Setting.module.scss';
import { AuthInput } from '../AuthInput/AuthInput';
import { ButtonM } from '../buttons';
import { Header } from '../Header/Header';
import { MainSection } from '../MainSection/MainSection';
import Swal from 'sweetalert2';

export const Setting = () => {
	const navigate = useNavigate();
	const current = JSON.parse(localStorage.getItem('currentUser'));
	console.log('setting page current: ', current);

	// 	取使用者自己的資料
	// const [initialValues, setInitialValues] = useState({
	// 	id: current.currentUserId,
	// 	account: current.currentUserAccount,
	// 	name: current.currentUserName,
	// 	email: current.currentUserEmail,
	// });
	// 	使用者取得自己的資料
	const [initialValues, setInitialValues] = useState({
		name: '',
		account: '',
		email: '',
		password: '',
		checkPassword: '',
	});
	console.log('initialValues:', initialValues);

	//輸入時同步取得
	// const [account, setAccount] = useState(initialValues.account);
	// const [name, setName] = useState(initialValues.name);
	// const [email, setEmail] = useState(initialValues.email);
	const [password, setPassword] = useState('');
	const [checkPassword, setCheckPassword] = useState('');
	const [checkPasswordErrorMessage, setCheckPasswordErrorMessage] = useState('');
	const [emptyErrorMessage, setEmptyErrorMessage] = useState('');
	const [emailErrorMessage, setEmailErrorMessage] = useState('');
	const [accountErrorMessage, setAccountErrorMessage] = useState('');

	// 取得初始資料
	useEffect(() => {
		const getUsersInfo = async () => {
			// 取得token
			const token = localStorage.getItem('token');
			console.log('前台token:', token);

			// 先驗證token，若無則直接回到login
			if (!token) {
				navigate('/signin');
				return;
			}
			// 登入時的使用者
			const currentUserId = JSON.parse(localStorage.getItem('currentUser'));
			// console.log('currentUserId: ', currentUserId.currentUserId);
			try {
				const data = await getUserData(currentUserId.currentUserId);
				if (data) {
					setInitialValues({
						account: data.account,
						name: data.name,
						email: data.email,
					});
					console.log('修改為的資料', data);
				}
			} catch (error) {
				console.error(error);
			}
		};
		getUsersInfo();
	}, []);

	// 點選儲存驗證
	const handleSave = async () => {
		console.log('initialValues', initialValues);
		// 輸入框若有任一為空，防止表單送出，且跳出提示視窗
		if (
			!initialValues.account.trim().length ||
			!initialValues.name.trim().length ||
			!initialValues.email.trim().length
		) {
			return;
		}
		// 若密碼輸入匡為空值，則跳出提示
		if (!initialValues.checkPassword.trim().length) {
			setEmptyErrorMessage('內容不得為空白');
			return;
		}
		// 若密碼確認輸入匡為空值，則跳出提示
		if (!initialValues.checkPassword.trim().length) {
			setEmptyErrorMessage('內容不得為空白');
			return;
		}
		// 密碼與確認密碼若不相符，防止表單送出，且跳出提示視窗
		if (initialValues.password !== initialValues.checkPassword) {
			setCheckPasswordErrorMessage('密碼不相符');
			return;
		}

		// 每次按下儲存時先清空所有錯誤訊息
		setAccountErrorMessage('');
		setEmailErrorMessage('');
		setCheckPasswordErrorMessage('');

		try {
			const currentUserId = JSON.parse(localStorage.getItem('currentUser'));
			console.log('currentUserId: ', currentUserId.currentUserId);

			// 帶入id，把更新的資料傳回後端
			const id = currentUserId.currentUserId;
			const data = await putUserData(id, {
				name: initialValues.name,
				account: initialValues.account,
				email: initialValues.email,
				password: password,
				checkPassword: checkPassword,
			});
			console.log('Data updated successfully', data);

			// 再取一次userData
			// if (data) {
			// 	setInitialValues({
			// 		account: data.data.userData.account,
			// 		name: data.data.userData.name,
			// 		email: data.data.userData.email,
			// 	});
			// 	console.log('渲染的新資料', data.data.userData);
			// }

			const errorMessage = data.errorMessage;
			const success = data.statusText;
			// 如果 account 已被註冊，顯示錯誤訊息
			if (errorMessage === 'account 已重複註冊！') {
				setAccountErrorMessage('account 已重複註冊！');
			}

			// 如果 email 已被註冊，顯示錯誤訊息
			if (errorMessage === 'email 已重複註冊！') {
				setEmailErrorMessage('email 已重複註冊！');
			}
			if (success === 'OK') {
				Swal.fire({
					title: '儲存成功',
					icon: 'success',
					showConfirmButton: false,
					position: 'top',
					timer: 1000,
				});
				setInitialValues({
					account: data.data.userData.account,
					name: data.data.userData.name,
					email: data.data.userData.email,
				});
			}
		} catch (error) {
			console.log(error);
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
					errorMessage={
						!initialValues.account.trim().length ? '內容不得為空白' : accountErrorMessage
					}
					value={initialValues.account}
					onChange={(accountInputValue) =>
						setInitialValues({
							...initialValues,
							account: accountInputValue,
						})
					}
				/>
				<AuthInput
					label='名稱'
					title='name'
					type='text'
					maxLength='50'
					value={initialValues.name}
					errorMessage={!initialValues.name.trim().length && '內容不得為空白'}
					onChange={(nameInputValue) =>
						setInitialValues({
							...initialValues,
							name: nameInputValue,
						})
					}
				/>
				<AuthInput
					label='Email'
					title='email'
					type='email'
					errorMessage={!initialValues.email.trim().length ? '內容不得為空白' : emailErrorMessage}
					value={initialValues.email}
					onChange={(emailInputValue) =>
						setInitialValues({
							...initialValues,
							email: emailInputValue,
						})
					}
				/>
				<AuthInput
					label='密碼'
					title='password'
					type='password'
					placeholder='請設定密碼'
					errorMessage={emptyErrorMessage}
					value={password}
					onChange={(passwordInputValue) => setPassword(passwordInputValue)}
				/>
				<AuthInput
					label='密碼確認'
					title='password'
					type='password'
					placeholder='請再次輸入密碼'
					value={checkPassword}
					errorMessage={emptyErrorMessage || checkPasswordErrorMessage}
					onChange={(checkPasswordInputValue) => setCheckPassword(checkPasswordInputValue)}
				/>
			</div>
			<div className={style.settingButton}>
				<ButtonM text='儲存' onClick={handleSave} />
			</div>
		</MainSection>
	);
};
