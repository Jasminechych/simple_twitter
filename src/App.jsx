import 'src/style/reset.scss';
import 'src/style/base.scss';
import { Sidebar } from 'src/components/Sidebar/Sidebar';
import { PopularListSection } from 'src/components/PopularListSection/PopularListSection';
import { ButtonXL, ButtonL, ButtonM, ButtonS, ButtonSW, ButtonXS } from 'src/components/buttons';

// import { compileString } from "sass";

function App() {
	return (
		<div className='App'>
			<h1>Twitter</h1>
			<Sidebar />
			<PopularListSection />
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
