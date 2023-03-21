import style from 'src/components/PopularListSection/PopularListSection.module.scss';
import { PopularList } from 'src/components/PopularListSection/PopularList';

export const PopularListSection = () => {
	return (
		<div className={style.popularListSectionContainer}>
			<div className={style.popularListSectionWrapper}>
				<h4 className={style.popularListSectionTitle}>推薦跟隨</h4>
				<PopularList />
			</div>
		</div>
	);
};
