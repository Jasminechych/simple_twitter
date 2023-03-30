import { Link } from 'react-router-dom';
import style from 'src/components/TweetInput/TweetInput.module.scss';
import { ButtonS } from '../buttons';
import { Header } from '../Header/Header';
import { MainSection } from '../MainSection/MainSection';
import { TweetList } from '../TweetList/TweetList';

export const TweetInput = () => {
	const currentUserAvatar = JSON.parse(localStorage.getItem('currentUser')).currentUserAvatar;
	return (
		<MainSection>
			<Header header='首頁' />
			<Link to='tweet'>
				<div className={style.tweetInputContainer}>
					<div className={style.tweetInputWrapper}>
						<div className={style.avatarAndText}>
							<img
								src={currentUserAvatar}
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
