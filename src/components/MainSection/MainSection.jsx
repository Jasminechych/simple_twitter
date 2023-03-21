import style from 'src/components/MainSection/MainSection.module.scss';
import { Header } from 'src/components/Header/Header';
import { UserProfile } from 'src/components/UserProfile/UserProfile';

export const MainSection = () => {
	return (
		<div className={style.mainSectionContainer}>
			<Header header='首頁' />
			<UserProfile username='John Doe' followingCount={`${34}個`} followerCount={`${59}位`} />
		</div>
	);
};
