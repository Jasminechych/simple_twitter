import { AuthInput } from 'src/components/AuthInput/AuthInput';
import { ButtonXL } from 'src/components/buttons';
import { ReactComponent as Logo } from 'src/assets/icons/logo.svg';
import style from 'src/pages/SignInPage/SignInPage.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { userSignIn } from 'src/apis/auth';
import { useState } from 'react';

export const SignInPage = () => {
	const [account, setAccount] = useState('');
	const [password, setPassword] = useState('');

	const navigate = useNavigate();

	const handleClick = async () => {
		if (!account.trim().length || !password.trim().length) return;
		const { data, success } = await userSignIn({ account, password });
		console.log('登入頁面的data.userData: ', data.userData);
		// const { id, account, name, email, avatar, cover, introduction } = data.userData;

		// "id": 14,
		//         "account": "user1",
		//         "name": "user1",
		//         "email": "user1@example.com",
		//         "avatar": "https://loremflickr.com/320/240/people,casual/?random=46.513627750545304",
		//         "cover": "https://loremflickr.com/320/240/scenary,city/?random=85.86640274849269",
		//         "introduction": null,
		//         "role": "user",
		//         "createdAt": "2023-03-26T04:18:40.000Z",
		//         "updatedAt": "2023-03-26T04:18:40.000Z"

		if (success) {
			localStorage.setItem('token', data.token);
			localStorage.setItem('currentUserId', data.userData.id);
			localStorage.setItem('currentUserAccount', data.userData.account);
			localStorage.setItem('currentUserName', data.userData.name);
			localStorage.setItem('currentUserEmail', data.userData.email);
			localStorage.setItem('currentUserAvatar', data.userData.avatar);
			localStorage.setItem('currentUserCover', data.userData.cover);
			localStorage.setItem('currentUserIntroduction', data.userData.introduction);
			navigate('/main');
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
				/>
				<AuthInput
					label='密碼'
					title='password'
					type='password'
					value={password}
					placeholder='請輸入密碼'
					onChange={(passwordInputValue) => setPassword(passwordInputValue)}
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
