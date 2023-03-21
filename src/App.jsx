import 'src/style/reset.scss';
import 'src/style/base.scss';
import { MainPage } from 'src/pages/MainPage';
import { ButtonXL, ButtonL, ButtonM, ButtonS, ButtonSW, ButtonXS } from 'src/components/buttons';
// import { compileString } from "sass";

function App() {
	return (
		<div className='App'>
			<MainPage />
			<ButtonXL text='ButtonXL' />
			<ButtonL text='ButtonL' />
			<ButtonM text='ButtonM' />
			<ButtonS text='ButtonS' />
			<ButtonSW text='ButtonSW' />
			<ButtonXS text='ButtonXS' />
		</div>
	);
}

export default App;
