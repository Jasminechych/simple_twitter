import { AuthInput } from 'src/components/AuthInput/AuthInput';
import { ButtonXL } from 'src/components/buttons';
import { ReactComponent as Logo } from 'src/assets/icons/logo.svg';
import style from 'src/pages/RegisterPage/RegisterPage.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { register } from 'src/apis/auth';
import Swal from 'sweetalert2';

export const RegisterPage = () => {
	const [account, setAccount] = useState('');
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [checkPassword, setCheckPassword] = useState('');
	// errorMessage
	const [accountErrorMessage, setAccountErrorMessage] = useState('');
	const [nameErrorMessage, setNameErrorMessage] = useState('');
	const [emailErrorMessage, setEmailErrorMessage] = useState('');
	const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
	const [checkPasswordErrorMessage, setCheckPasswordErrorMessage] = useState('');

	const navigate = useNavigate();

	const handleClick = async () => {
		// 每次按下註冊按鈕時先清空所有錯誤訊息
		setAccountErrorMessage('');
		setNameErrorMessage('');
		setEmailErrorMessage('');
		setPasswordErrorMessage('');
		setCheckPasswordErrorMessage('');

		// 若帳號為空，防止表單送出
		if (!account.trim().length) {
			setAccountErrorMessage('帳號不得為空');
			// return;
		}

		// 若名稱為空，防止表單送出
		if (!name.trim().length) {
			setNameErrorMessage('名稱不得為空');
			// return;
		}

		// 若 email 為空，防止表單送出
		if (!email.trim().length) {
			setEmailErrorMessage('Email 不得為空');
			// return;
		}

		// 若密碼為空，防止表單送出
		if (!password.trim().length) {
			setPasswordErrorMessage('密碼不得為空');
			// return;
		}

		// 若確認密碼為空，防止表單送出
		if (!password.trim().length) {
			setCheckPasswordErrorMessage('確認密碼不得為空');
			// return;
		}

		// 輸入框若有任一為空，防止表單送出
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

		const { data, success, errorMessage } = await register({
			account,
			name,
			email,
			password,
			checkPassword,
		});

		if (success) {
			// 註冊成功儲存使用者資料
			const currentUser = {
				currentUserId: data.userData.id,
				currentUserAccount: data.userData.account,
				currentUserName: data.userData.name,
				currentUserEmail: data.userData.email,
				currentUserIntroduction: '',
			};
			localStorage.setItem('token', data.token);
			localStorage.setItem('currentUser', JSON.stringify(currentUser));
			Swal.fire({
				position: 'center',
				icon: 'success',
				title: '註冊成功！',
				showConfirmButton: false,
				timer: 1500,
			});
			navigate('/main');
		} else {
			Swal.fire({
				position: 'center',
				icon: 'error',
				title: '註冊失敗！',
				showConfirmButton: false,
				timer: 1500,
			});

			// 如果 account 已被註冊，顯示錯誤訊息
			if (errorMessage === 'account 已重複註冊！') {
				setAccountErrorMessage('此帳號已被註冊');
			}

			// 如果 email 已被註冊，顯示錯誤訊息
			if (errorMessage === 'email 已重複註冊！') {
				setEmailErrorMessage('此信箱已被註冊');
			}
		}
	};

	return (
		<main className={style.pageContainer}>
			<div className={style.logo}>
				<Logo />
			</div>
			<h3>建立你的帳號</h3>
			<div className={style.pageAuthInputContainer}>
				<AuthInput
					label='帳號'
					title='account'
					type='text'
					placeholder='請輸入帳號'
					errorMessage={accountErrorMessage}
					value={account}
					onChange={(accountInputValue) => setAccount(accountInputValue)}
				/>
				<AuthInput
					label='名稱'
					title='name'
					type='text'
					placeholder='請輸入使用者名稱'
					maxLength='50'
					value={name}
					onChange={(nameInputValue) => setName(nameInputValue)}
					errorMessage={nameErrorMessage}
				/>
				<AuthInput
					label='Email'
					title='email'
					type='email'
					placeholder='請輸入 Email'
					errorMessage={emailErrorMessage}
					value={email}
					onChange={(emailInputValue) => setEmail(emailInputValue)}
				/>
				<AuthInput
					label='密碼'
					title='password'
					type='password'
					placeholder='請設定密碼'
					value={password}
					onChange={(passwordInputValue) => setPassword(passwordInputValue)}
					errorMessage={passwordErrorMessage}
				/>
				<AuthInput
					label='密碼確認'
					title='checkPassword'
					type='password'
					placeholder='請再次輸入密碼'
					errorMessage={checkPasswordErrorMessage}
					value={checkPassword}
					onChange={(checkPasswordInputValue) => setCheckPassword(checkPasswordInputValue)}
				/>
			</div>
			<div className={style.pageLinkContainer}>
				<ButtonXL text='註冊' onClick={handleClick} />
				<Link to='/signin' className={style.link}>
					取消
				</Link>
			</div>
		</main>
	);
};
