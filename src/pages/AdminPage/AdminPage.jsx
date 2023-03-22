import { AuthInput } from 'src/components/AuthInput/AuthInput';
import { ButtonXL } from 'src/components/buttons';
import { ReactComponent as Logo } from 'src/assets/icons/logo.svg';
import style from 'src/pages/AdminPage/AdminPage.module.scss';

export const AdminPage = () => {
	return (
		<main className={style.pageContainer}>
			<div className={style.logo}>
				<Logo />
			</div>
			<h3>後台登入</h3>
			<div className={style.pageAuthInputContainer}>
				<AuthInput label='帳號' title='account' type='text' placeholder='請輸入帳號' />
				<AuthInput label='密碼' title='password' type='password' placeholder='請輸入密碼' />
			</div>
			<div className={style.pageButtonContainer}>
				<ButtonXL text='登入' />
				<div>前台登入 待 pages 都完成改 router</div>
				{/* <Link to='/signup'>註冊</Link>
				<p>*</p>
				<Link to='/signup'>後台登入</Link> */}
			</div>
		</main>
	);
};
