import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUserData } from 'src/apis/user';
import style from 'src/components/TweetInput/TweetInput.module.scss';
import { ButtonS } from 'src/components/buttons';
import { Header } from 'src/components/Header/Header';
import { MainSection } from 'src/components/MainSection/MainSection';
import { TweetListMain } from 'src/components/TweetListMain/TweetListMain';

export const TweetInput = () => {
	const current = JSON.parse(localStorage.getItem('currentUser'));
	const [initialValues, setInitialValues] = useState({ avatar: current.currentUserAvatar });
	useEffect(() => {
		const getUsersInfo = async () => {
			const currentUserId = JSON.parse(localStorage.getItem('currentUser'));
			try {
				const data = await getUserData(currentUserId.currentUserId);
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
			<TweetListMain tab='totalTweetList' />
		</MainSection>
	);
};
