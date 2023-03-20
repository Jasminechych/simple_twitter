import 'src/style/reset.scss';
import 'src/style/base.scss';
// import { compileString } from "sass";
import { Sidebar } from 'src/components/Sidebar/Sidebar';
import { PopularListSection } from 'src/components/PopularListSection/PopularListSection.jsx';

function App() {
	return (
		<div className='App'>
			<h1>Twitter</h1>
			<Sidebar />
			<PopularListSection />
		</div>
	);
}

export default App;
