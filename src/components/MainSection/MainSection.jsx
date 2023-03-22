import style from 'src/components/MainSection/MainSection.module.scss';
import { Header } from 'src/components/Header/Header';
import { UserProfile } from 'src/components/UserProfile/UserProfile';
import { UserItem } from 'src/components/UserItem/UserItem';

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
			<UserItem
				name='Miki'
				description='Just finished a great workout and feeling energized! 💪 #fitnessmotivation #healthylifestyle
				I love spending time with my pets! Just booked my next vacation! 🌴✈️ #travelholic'
			/>
		</div>
	);
};
