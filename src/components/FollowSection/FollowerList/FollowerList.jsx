import style from 'src/components/FollowSection/FollowerList/FollowerList.module.scss';
import { UserItem } from 'src/components/UserItem/UserItem';

export const FollowerList = () => {
	return (
		<div className={style.followerListContainer}>
			<div className={style.followerListTitle}>追隨者</div>
			<div>
				<UserItem
					name='Miki'
					description='Just finished a great workout and feeling energized! 💪 #fitnessmotivation #healthylifestyle
				I love spending time with my pets! Just booked my next vacation! 🌴✈️ #travelholic'
				/>
			</div>
		</div>
	);
};
