import style from 'src/components/MainSection/MainSection.module.scss';
import { Header } from 'src/components/Header/Header';
import { UserProfile } from 'src/components/UserProfile/UserProfile';
import { TweetList } from 'src/components/TweetList/TweetList';
import { ReplyPost } from 'src/components/ReplyPost/ReplyPost';
import { ReplyItem } from 'src/components/ReplyItem/ReplyItem';

export const MainSection = () => {
	return (
		<div className={style.mainSectionContainer}>
			<Header header='首頁' />
			<UserProfile
				username='John Doe'
				followingCount={`${34}個`}
				followerCount={`${59}位`}
				intro='I am Sarah, a software engineer with 7 years of experience. Nice to meet you!'
			/>
			<TweetList />
			<ReplyPost />
			<ReplyItem />
		</div>
	);
};
