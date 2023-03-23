import 'src/style/reset.scss';
import 'src/style/base.scss';
import { MainPage, RegisterPage, SignInPage, AdminPage, AdminMainPage } from 'src/pages';
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
					<Route path='*' element={<RegisterPage />} />
					<Route path='admin'>
						<Route path={'signin'} element={<AdminPage />} />
						<Route path={'tweets'} element={<AdminMainPage />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
