import 'src/style/reset.scss';
import 'src/style/base.scss';
import { Sidebar } from 'src/components/Sidebar/Sidebar';
import { PopularListSection } from 'src/components/PopularListSection/PopularListSection';
import { MainSection } from 'src/components/MainSection/MainSection';
import { ButtonXL, ButtonL, ButtonM, ButtonS, ButtonSW, ButtonXS } from 'src/components/buttons';
import { AuthInput } from 'src/components/AuthInput/AuthInput';
// import { compileString } from "sass";

function App() {
	return (
		<div className='App'>
			<h1>Twitter</h1>
			<Sidebar />
			<MainSection />
			<PopularListSection />
			<ButtonXL text='ButtonXL' />
			<ButtonL text='ButtonL' />
			<ButtonM text='ButtonM' />
			<ButtonS text='ButtonS' />
			<ButtonSW text='ButtonSW' />
			<ButtonXS text='ButtonXS' />
			<AuthInput label='名稱' title='name' type='text' placeholder='請輸入帳號' maxLength='2' />
			<AuthInput label='密碼' title='password' type='password' placeholder='請輸入密碼' />
		</div>
	);
}

export default App;
