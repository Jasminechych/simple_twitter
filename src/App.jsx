import 'src/style/reset.scss';
import 'src/style/base.scss';
import { MainPage, RegisterPage, SignInPage, AdminPage, AdminMainPage } from 'src/pages';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { UserProfile } from 'src/components/UserProfile/UserProfile';
// import { FollowingList } from 'src/components/FollowSection/FollowingList/FollowingList';
// import { FollowerList } from 'src/components/FollowSection/FollowerList/FollowerList';
import { FollowSection } from 'src/components/FollowSection/FollowSection';
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
import { ReplyModal } from './components/ReplyModal/ReplyModal';
// import { useState, useEffect } from 'react';
// import { getUserData } from 'src/apis/user';

// import { UserProvider } from 'src/context/UserContext';

// import { compileString } from "sass";

// eslint 會跳錯 process is not defined
// const basename = process.REACT_APP_PUBLIC_URL;

function App() {
	return (
		<div className='App'>
			{/* <UserProvider> */}
			<BrowserRouter basename={'/simple_twitter'}>
				<Routes>
					<Route path='*' element={<SignInPage />} />
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

					<Route
						path='user/self'
						element={
							<MainPage>
								<UserProfile />
							</MainPage>
						}
					/>
					{/* 待刪除 */}
					<Route
						path='user/other'
						element={
							<MainPage>
								<UserProfile />
							</MainPage>
						}
					/>
					{/* 測試中 */}
					<Route path='user/:id' element={<MainPage />}>
						<Route index element={<UserProfile />} />
						<Route path='following' element={<FollowSection />} />
						<Route path='follower' element={<FollowSection />} />
					</Route>

					{/* <Route
						path='following'
						element={
							<MainPage>
								<FollowingList />
							</MainPage>
						}
					/>
					<Route
						path='follower'
						element={
							<MainPage>
								<FollowerList />
							</MainPage>
						}
					/> */}

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
								<UserProfile />
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
					{/* 後台結束 */}
					<Route
						path='user/self/tab=tweet'
						element={
							<MainPage>
								<UserProfile />
							</MainPage>
						}
					/>
					<Route
						path='user/self/tab=reply'
						element={
							<MainPage>
								<UserProfile />
							</MainPage>
						}
					/>
					<Route
						path='user/self/tab=like'
						element={
							<MainPage>
								<UserProfile />
							</MainPage>
						}
					/>
					<Route
						path='/reply_list/:id'
						element={
							<MainPage>
								<MainSection>
									<ReplyListSection />
								</MainSection>
							</MainPage>
						}
					/>
					<Route
						path='/replyList:id/modal'
						element={
							<MainPage>
								<ReplyModal />
							</MainPage>
						}
					/>
				</Routes>
			</BrowserRouter>
			{/* </UserProvider> */}
		</div>
	);
}

export default App;
