import 'src/style/reset.scss';
import 'src/style/base.scss';
import { Sidebar } from 'src/components/Sidebar/Sidebar';
import { PopularListSection } from 'src/components/PopularListSection/PopularListSection';
import { MainSection } from 'src/components/MainSection/MainSection';

// import { compileString } from "sass";

function App() {
	return (
		<div className='App'>
			<h1>Twitter</h1>
			<Sidebar />
			<MainSection />
			<PopularListSection />
		</div>
	);
}

export default App;
