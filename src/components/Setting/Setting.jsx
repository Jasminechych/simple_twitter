import style from 'src/components/Setting/Setting.module.scss';
import { AuthInput } from '../AuthInput/AuthInput';
import { ButtonM } from '../buttons';
import { Header } from '../Header/Header';
import { MainSection } from '../MainSection/MainSection';

export const Setting = () => {
	return (
		<MainSection>
			<Header header='帳號設定' />
			<div className={style.settingAuthInputContainer}>
				<AuthInput label='帳號' title='account' type='text' />
				<AuthInput label='名稱' title='name' type='text' />
				<AuthInput label='Email' title='email' type='email' />
				<AuthInput label='密碼' title='password' type='password' placeholder='請設定密碼' />
				<AuthInput label='密碼確認' title='password' type='password' placeholder='請再次輸入密碼' />
			</div>
			<div className={style.settingButton}>
				<ButtonM text='儲存' />
			</div>
		</MainSection>
	);
};
