import 'src/style/reset.scss';
import 'src/style/base.scss';
import { MainPage, RegisterPage, SignInPage, AdminPage, AdminMainPage } from 'src/pages';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { UserProfile } from 'src/components/UserProfile/UserProfile';
import { FollowingList } from 'src/components/FollowSection/FollowingList/FollowingList';
import { FollowerList } from 'src/components/FollowSection/FollowerList/FollowerList';

import { AdminTweetList } from 'src/components/AdminTweetList/AdminTweetList';
import { UserList } from 'src/components/UserList/UserList';
import { AdminUsersSection } from 'src/components/AdminUsersSection/AdminUsersSection';
import { Setting } from './components/Setting/Setting';
import { EditModal } from './components/Modal/EditModal/EditModal';
import { TweetInput } from './components/TweetInput/TweetInput';
import { TweetModal } from './components/Modal/TweetModal/TweetModal';
import { AdminTweetsSection } from 'src/components/AdminTweetsSection/AdminTweetsSection';
import { MainSection } from './components/MainSection/MainSection';
import { ReplyListSection } from 'src/components/ReplyListSection/ReplyListSection';

// import { compileString } from "sass";

// eslint 會跳錯 process is not defined
const basename = window.process.REACT_APP_PUBLIC_URL;

function App() {
	return (
		<div className='App'>
			<BrowserRouter basename={basename}>
				<Routes>
					<Route path='register' element={<RegisterPage />} />
					<Route path='signin' element={<SignInPage />} />
					<Route
						path='main'
						element={
							<MainPage>
								<TweetInput />
							</MainPage>
						}
					/>
					<Route
						path='/main/tweet'
						element={
							<MainPage>
								<TweetInput />
								<TweetModal />
							</MainPage>
						}
					/>
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
					<Route
						path='setting'
						element={
							<MainPage>
								<Setting />
							</MainPage>
						}
					/>
					<Route
						path='/user/self/edit'
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
								<EditModal />
							</MainPage>
						}
					/>
					{/* 後台 */}
					<Route path='adminsignin' element={<AdminPage />} />
					<Route path='admin' element={<AdminMainPage />}>
						<Route
							path='tweets'
							element={
								<AdminTweetsSection title='推文清單'>
									<AdminTweetList />
								</AdminTweetsSection>
							}
						/>
						<Route
							path='users'
							element={
								<AdminUsersSection title='使用者列表'>
									<UserList />
								</AdminUsersSection>
							}
						/>
					</Route>
					<Route
						path='user/self/tab=tweet'
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
						path='user/self/tab=reply'
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
						path='user/self/tab=like'
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
						path='/replyList'
						element={
							<MainPage>
								<MainSection>
									<ReplyListSection />
								</MainSection>
							</MainPage>
						}
					/>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
