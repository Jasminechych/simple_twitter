import style from 'src/components/FollowSection/FollowSection.module.scss';
import { UserItem } from 'src/components/UserItem/UserItem';
import { FollowerList } from 'src/components/FollowSection/FollowerList/FollowerList';
import { FollowingList } from 'src/components/FollowSection/FollowingList/FollowingList';

export const FollowSection = () => {
	return (
		<div className={style.followSectionContainer}>
			<div className={style.followTabWrapper}>
				<FollowerList />
				<FollowingList />
			</div>
			<div className={style.userItemWrapper}>
				<UserItem
					name='Miki'
					description='Just finished a great workout and feeling energized! 💪 #fitnessmotivation #healthylifestyle
				I love spending time with my pets! Just booked my next vacation! 🌴✈️ #travelholic'
				/>
			</div>
		</div>
	);
};
