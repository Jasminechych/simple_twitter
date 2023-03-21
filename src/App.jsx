import 'src/style/reset.scss';
import 'src/style/base.scss';
import { Sidebar } from 'src/components/Sidebar/Sidebar';
import { PopularListSection } from 'src/components/PopularListSection/PopularListSection';
import { Header } from 'src/components/Header/Header';

// import { compileString } from "sass";

function App() {
	return (
		<div className='App'>
			<h1>Twitter</h1>
			<Sidebar />
			<Header header='首頁' />
			<PopularListSection />
		</div>
	);
}

export default App;
