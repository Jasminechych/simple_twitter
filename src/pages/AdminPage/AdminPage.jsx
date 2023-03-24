import { AuthInput } from 'src/components/AuthInput/AuthInput';
import { ButtonXL } from 'src/components/buttons';
import { ReactComponent as Logo } from 'src/assets/icons/logo.svg';
import style from 'src/pages/AdminPage/AdminPage.module.scss';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { adminSignIn } from 'src/apis/auth';

export const AdminPage = () => {
	const [account, setAccount] = useState('');
	const [password, setPassword] = useState('');
	console.log('account', account);
	console.log('password', password);

	const handleClick = async () => {
		if (!account.trim().length || !password.trim().length) return;
		const { token, success } = await adminSignIn({ account, password });
		if (success) {
			localStorage.setItem('token', token);
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
				/>
				<AuthInput
					label='密碼'
					title='password'
					type='password'
					placeholder='請輸入密碼'
					value={password}
					onChange={(passwordInputValue) => setPassword(passwordInputValue)}
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
