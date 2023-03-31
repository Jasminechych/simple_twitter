import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUserData } from 'src/apis/user';
import style from 'src/components/TweetInput/TweetInput.module.scss';
import { ButtonS } from '../buttons';
import { Header } from '../Header/Header';
import { MainSection } from '../MainSection/MainSection';
import { TweetList } from '../TweetList/TweetList';

export const TweetInput = () => {
	const current = JSON.parse(localStorage.getItem('currentUser'));
	const [initialValues, setInitialValues] = useState({ avatar: current.currentUserAvatar });
	useEffect(() => {
		const getUsersInfo = async () => {
			const currentUserId = JSON.parse(localStorage.getItem('currentUser'));
			console.log('currentUserId: ', currentUserId.currentUserId);
			try {
				const data = await getUserData(currentUserId.currentUserId);
				console.log('GET從後台來的data:', data);
				if (data) {
					setInitialValues({
						avatar: data.avatar,
					});
				}
			} catch (error) {
				console.error(error);
			}
		};
		getUsersInfo();
	}, []);
	// const currentUserAvatar = JSON.parse(localStorage.getItem('currentUser')).currentUserAvatar;
	return (
		<MainSection>
			<Header header='首頁' />
			<Link to='tweet'>
				<div className={style.tweetInputContainer}>
					<div className={style.tweetInputWrapper}>
						<div className={style.avatarAndText}>
							<img
								src={initialValues.avatar}
								alt='currentUserAvatar'
								className={style.tweetInputAvatar}
							/>
							<h5 className={style.text}>有什麼新鮮事？</h5>
						</div>
						<ButtonS text='推文' className={style.tweetInputButton} />
					</div>
				</div>
				<div className={style.line}></div>
			</Link>
			<TweetList />
		</MainSection>
	);
};
