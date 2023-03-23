import 'src/style/reset.scss';
import 'src/style/base.scss';
import { MainPage, RegisterPage, SignInPage, AdminPage } from 'src/pages';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { UserProfile } from './components/UserProfile/UserProfile';
import { FollowingList } from './components/FollowSection/FollowingList/FollowingList';
import { FollowerList } from './components/FollowSection/FollowerList/FollowerList';

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
					<Route
						path='user/self'
						element={
							<MainPage>
								<UserProfile
									name={`John Doe`}
									account={`John Doe`}
									intro={`Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor`}
									followerCounts={`${59}位`}
									followingCounts={`${34}個`}
								/>
							</MainPage>
						}
					/>
					<Route
						path='following'
						element={
							<MainPage>
								<FollowingList name={`John Doe`} tweets={`25`} />
							</MainPage>
						}
					/>
					<Route
						path='follower'
						element={
							<MainPage>
								<FollowerList name={`John Doe`} tweets={`25`} />
							</MainPage>
						}
					/>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
