import { AuthInput } from 'src/components/AuthInput/AuthInput';
import { ButtonXL } from 'src/components/buttons';
import { ReactComponent as Logo } from 'src/assets/icons/logo.svg';
import style from 'src/pages/RegisterPage/RegisterPage.module.scss';
import { Link } from 'react-router-dom';

export const RegisterPage = () => {
	return (
		<main className={style.pageContainer}>
			<div className={style.logo}>
				<Logo />
			</div>
			<h3>建立你的帳號</h3>
			<div className={style.pageAuthInputContainer}>
				<AuthInput label='帳號' title='account' type='text' placeholder='請輸入帳號' />
				<AuthInput
					label='名稱'
					title='name'
					type='text'
					placeholder='請輸入使用者名稱'
					maxLength='50'
				/>
				<AuthInput label='Email' title='email' type='email' placeholder='請輸入 Email' />
				<AuthInput label='密碼' title='password' type='password' placeholder='請設定密碼' />
				<AuthInput label='密碼確認' title='password' type='password' placeholder='請再次輸入密碼' />
			</div>
			<div className={style.pageLinkContainer}>
				<ButtonXL text='註冊' />
				<Link to='/signin' className={style.link}>
					取消
				</Link>
			</div>
		</main>
	);
};
