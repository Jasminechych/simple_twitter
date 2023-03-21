import 'src/style/reset.scss';
import 'src/style/base.scss';
import { MainPage, RegisterPage } from 'src/pages';

// import { compileString } from "sass";

function App() {
	return (
		<div className='App'>
			<MainPage />
			<RegisterPage />
		</div>
	);
}

export default App;
