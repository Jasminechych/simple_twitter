import { FollowSection } from 'src/components/FollowSection/FollowSection';
import { PopularListSection } from 'src/components/PopularListSection/PopularListSection';
import { Sidebar } from 'src/components/Sidebar/Sidebar';
// import { UserProfile } from 'src/components/UserProfile/UserProfile';
import style from 'src/pages/MainPage/MainPage.module.scss';

export const MainPage = () => {
	return (
		<div className={style.mainPageContainer}>
			<Sidebar />
			{/* <UserProfile
				name='John Doe'
				account='John Doe'
				intro='Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor.'
				followingCount={`${34}個`}
				followerCount={`${59}位`}
			/> */}
			<FollowSection
				name='John Doe'
				tweets='25'
				description='Just finished a great workout and feeling energized! 💪 #fitnessmotivation #healthylifestyle
				I love spending time with my pets! Just booked my next vacation! 🌴✈️ #travelholic'
			/>
			<PopularListSection />
		</div>
	);
};
