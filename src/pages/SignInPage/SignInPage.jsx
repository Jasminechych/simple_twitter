import { AuthInput } from 'src/components/AuthInput/AuthInput';
import { ButtonXL } from 'src/components/buttons';
import { ReactComponent as Logo } from 'src/assets/icons/logo.svg';
import style from 'src/pages/SignInPage/SignInPage.module.scss';
import { Link } from 'react-router-dom';

export const SignInPage = () => {
	return (
		<main className={style.pageContainer}>
			<div className={style.logo}>
				<Logo />
			</div>
			<h3>登入 Alphitter</h3>
			<div className={style.pageAuthInputContainer}>
				<AuthInput label='帳號' title='account' type='text' placeholder='請輸入帳號' />
				<AuthInput label='密碼' title='password' type='password' placeholder='請輸入密碼' />
			</div>
			<div className={style.pageButtonContainer}>
				<ButtonXL text='登入' />
				<div>註冊 後台登入 待 pages 都完成改 router</div>
				<Link to='/register'>註冊</Link>
				<p>*</p>
				<Link to='/admin'>後台登入</Link>
			</div>
		</main>
	);
};
