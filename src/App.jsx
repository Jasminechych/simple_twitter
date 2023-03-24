import 'src/style/reset.scss';
import 'src/style/base.scss';
import { MainPage, RegisterPage, SignInPage, AdminPage, AdminMainPage } from 'src/pages';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { UserProfile } from 'src/components/UserProfile/UserProfile';
import { FollowingList } from 'src/components/FollowSection/FollowingList/FollowingList';
import { FollowerList } from 'src/components/FollowSection/FollowerList/FollowerList';
// import { compileString } from "sass";

function App() {
	return (
		<div className='App'>
			<BrowserRouter basename={'/simple_twitter'}>
				<Routes>
					<Route path='register' element={<RegisterPage />} />
					<Route path='signin' element={<SignInPage />} />
					<Route path='main' element={<MainPage />} />
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
									tweets={`25`}
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
