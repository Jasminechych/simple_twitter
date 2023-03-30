import { AuthInput } from 'src/components/AuthInput/AuthInput';
import { ButtonXL } from 'src/components/buttons';
import { ReactComponent as Logo } from 'src/assets/icons/logo.svg';
import style from 'src/pages/SignInPage/SignInPage.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { userSignIn } from 'src/apis/auth';
import { useState } from 'react';
import Swal from 'sweetalert2';

export const SignInPage = () => {
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

		const { data, success, errorMessage } = await userSignIn({ account, password });

		console.log('success', success);

		if (success) {
			const currentUser = {
				currentUserId: data.userData.id,
				currentUserAccount: data.userData.account,
				currentUserName: data.userData.name,
				currentUserEmail: data.userData.email,
				currentUserAvatar: data.userData.avatar,
				currentUserCover: data.userData.cover,
				currentUserIntroduction: data.userData.introduction,
			};
			localStorage.setItem('token', data.token);
			localStorage.setItem('currentUser', JSON.stringify(currentUser));
			Swal.fire({
				position: 'center',
				icon: 'success',
				title: '登入成功！',
				showConfirmButton: false,
				timer: 1500,
			});

			navigate('/main');
		} else {
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

			if (errorMessage === '帳號不存在') {
				setAccountErrorMessage('帳號不存在');
			}
		}
	};
	return (
		<main className={style.pageContainer}>
			<div className={style.logo}>
				<Logo />
			</div>
			<h3>登入 Alphitter</h3>
			<div className={style.pageAuthInputContainer}>
				<AuthInput
					label='帳號'
					title='account'
					type='text'
					value={account}
					placeholder='請輸入帳號'
					onChange={(accountInputValue) => setAccount(accountInputValue)}
					errorMessage={accountErrorMessage}
				/>
				<AuthInput
					label='密碼'
					title='password'
					type='password'
					value={password}
					placeholder='請輸入密碼'
					onChange={(passwordInputValue) => setPassword(passwordInputValue)}
					errorMessage={passwordErrorMessage}
				/>
			</div>
			<div className={style.pageLinkContainer}>
				<ButtonXL text='登入' onClick={handleClick} />
				<div>
					<Link className={style.link} to='/register'>
						註冊
					</Link>
					・
					<Link className={style.link} to='/adminsignin'>
						後台登入
					</Link>
				</div>
			</div>
		</main>
	);
};
