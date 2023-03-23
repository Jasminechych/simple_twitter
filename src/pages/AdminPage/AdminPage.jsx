import { AuthInput } from 'src/components/AuthInput/AuthInput';
import { ButtonXL } from 'src/components/buttons';
import { ReactComponent as Logo } from 'src/assets/icons/logo.svg';
import style from 'src/pages/AdminPage/AdminPage.module.scss';
import { Link } from 'react-router-dom';

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
			<div className={style.pageLinkContainer}>
				<ButtonXL text='登入' />
				<Link to='signin'>前台登入</Link>
			</div>
		</main>
	);
};
