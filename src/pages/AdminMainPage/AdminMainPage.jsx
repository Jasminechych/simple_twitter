import { useState } from 'react';
import { AdminSidebar } from 'src/components/AdminSidebar/AdminSidebar';
import { AdminMainSection } from 'src/components/AdminMainSection/AdminMainSection';
import { TweetList } from 'src/components/TweetList/TweetList';
import { UserList } from 'src/components/UserList/UserList';
import style from 'src/pages/AdminMainPage/AdminMainPage.module.scss';
// import { useNavigate } from 'react-router-dom';

export const AdminMainPage = () => {
	// const navigate = useNavigate();

	const [page, setPage] = useState('tweetList');
	console.log('page: ', page);

	const handlePageChange = (page) => {
		setPage(page);
	};

	return (
		<div className={style.page}>
			<AdminSidebar handlePageChange={handlePageChange} />
			{page === 'tweetList' && (
				<AdminMainSection pageTitle='推文清單'>
					<TweetList />
				</AdminMainSection>
			)}
			{page === 'userList' && (
				<AdminMainSection pageTitle='使用者列表'>
					<UserList />
				</AdminMainSection>
			)}
		</div>
	);
};
