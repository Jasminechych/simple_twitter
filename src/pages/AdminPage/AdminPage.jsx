import { AuthInput } from 'src/components/AuthInput/AuthInput';
import { ButtonXL } from 'src/components/buttons';
import { ReactComponent as Logo } from 'src/assets/icons/logo.svg';
import style from 'src/pages/AdminPage/AdminPage.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { adminSignIn } from 'src/apis/auth';
import Swal from 'sweetalert2';

export const AdminPage = () => {
	const [account, setAccount] = useState('');
	const [password, setPassword] = useState('');
	const [accountErrorMessage, setAccountErrorMessage] = useState('');
	const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

	const navigate = useNavigate();

	const handleClick = async () => {
		setAccountErrorMessage('');
		setPasswordErrorMessage('');

		if (!account.trim().length) {
			setAccountErrorMessage('帳號不得為空');
		}
		if (!password.trim().length) {
			setPasswordErrorMessage('密碼不得為空');
		}
		if (!account.trim().length || !password.trim().length) return;

		const { data, success, errorMessage } = await adminSignIn({ account, password });

		if (success) {
			localStorage.setItem('token', data.token);
			Swal.fire({
				position: 'center',
				icon: 'success',
				title: '登入成功！',
				showConfirmButton: false,
				timer: 1500,
			});
			navigate('/admin/tweets');
		} else {
			console.log(errorMessage);
			Swal.fire({
				position: 'center',
				icon: 'error',
				title: '登入失敗！',
				showConfirmButton: false,
				timer: 1500,
			});

			if (errorMessage === '帳號或密碼錯誤！') {
				setAccountErrorMessage('帳號或密碼錯誤！');
				setPasswordErrorMessage('帳號或密碼錯誤！');
			}

			if (errorMessage === '權限不足') {
				setAccountErrorMessage('權限不足');
			}
		}
	};

	return (
		<main className={style.pageContainer}>
			<div className={style.logo}>
				<Logo />
			</div>
			<h3>後台登入</h3>
			<div className={style.pageAuthInputContainer}>
				<AuthInput
					label='帳號'
					title='account'
					type='text'
					placeholder='請輸入帳號'
					value={account}
					onChange={(accountInputValue) => setAccount(accountInputValue)}
					errorMessage={accountErrorMessage}
				/>
				<AuthInput
					label='密碼'
					title='password'
					type='password'
					placeholder='請輸入密碼'
					value={password}
					onChange={(passwordInputValue) => setPassword(passwordInputValue)}
					errorMessage={passwordErrorMessage}
				/>
			</div>
			<div className={style.pageLinkContainer}>
				<ButtonXL text='登入' onClick={handleClick} />
				<Link to='/signin' className={style.link}>
					前台登入
				</Link>
			</div>
		</main>
	);
};
