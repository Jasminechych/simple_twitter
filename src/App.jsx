import 'src/style/reset.scss';
import 'src/style/base.scss';
import { MainPage, RegisterPage, SignInPage, AdminPage } from 'src/pages';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// import { compileString } from "sass";

function App() {
	return (
		<div className='App'>
			<BrowserRouter>
				<Routes>
					<Route path='register' element={<RegisterPage />} />
					<Route path='signin' element={<SignInPage />} />
					<Route path='main' element={<MainPage />} />
					<Route path='admin' element={<AdminPage />} />
					<Route path='*' element={<RegisterPage />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
