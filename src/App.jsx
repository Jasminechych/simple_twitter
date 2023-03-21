import 'src/style/reset.scss';
import 'src/style/base.scss';
// import { compileString } from "sass";
import { Sidebar } from 'src/components/Sidebar/Sidebar';

function App() {
	return (
		<div className='App'>
			<h1>Twitter</h1>
			<Sidebar />
		</div>
	);
}

export default App;
