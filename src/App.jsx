import 'src/style/reset.scss';
import 'src/style/base.scss';
import { Sidebar } from 'src/components/Sidebar/Sidebar';
import { PopularListSection } from 'src/components/PopularListSection/PopularListSection';
import {
	ButtonAuth,
	ButtonL,
	ButtonM,
	ButtonS,
	ButtonSW,
	ButtonModal,
	ButtonProfile,
	ButtonSetting,
} from 'src/components/buttons';

// import { compileString } from "sass";

function App() {
	return (
		<div className='App'>
			<h1>Twitter</h1>
			<Sidebar />
			<PopularListSection />
			<ButtonAuth text='ButtonAuth' />
			<ButtonL text='ButtonL' />
			<ButtonM text='ButtonM' />
			<ButtonS text='ButtonS' />
			<ButtonSW text='ButtonSW' />
			<ButtonModal text='ButtonModal' />
			<ButtonProfile text='ButtonProfile' />
			<ButtonSetting text='ButtonSetting' />
		</div>
	);
}

export default App;
