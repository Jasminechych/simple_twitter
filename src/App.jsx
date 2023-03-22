import 'src/style/reset.scss';
import 'src/style/base.scss';
import { MainPage, RegisterPage, SignInPage } from 'src/pages';

// import { compileString } from "sass";

function App() {
	return (
		<div className='App'>
			<MainPage />
			<RegisterPage />
			<SignInPage />
		</div>
	);
}

export default App;
