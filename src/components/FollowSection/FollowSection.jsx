import style from 'src/components/FollowSection/FollowSection.module.scss';
import { UserItem } from 'src/components/UserItem/UserItem';
import { FollowerList } from 'src/components/FollowSection/FollowerList/FollowerList';
import { FollowingList } from 'src/components/FollowSection/FollowingList/FollowingList';
import { MainSection } from 'src/components/MainSection/MainSection';
import { ReactComponent as BackArrow } from 'src/assets/icons/back.svg';
import { Header } from 'src/components/Header/Header';

export const FollowSection = ({ username, tweets }) => {
	return (
		<MainSection>
			<div className={style.followHeaderWrapper}>
				<BackArrow className={style.backArrow} />
				<div className={style.followHeader}>
					<Header header={username} className={style.header} />
					<a href='' className={style.tweets}>{`${tweets}推文`}</a>
				</div>
			</div>
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
		</MainSection>
	);
};
