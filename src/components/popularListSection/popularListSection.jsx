import style from 'src/components/popularListSection/PopularListSection.module.scss';
import { PopularListItem } from 'src/components/popularListSection/PopularListItem';

export const PopularListSection = () => {
	return (
		<div className={style.popularListSectionContainer}>
			<div className={style.popularListSectionWrapper}>
				<h4 className={style.popularListSectionTitle}>推薦跟隨</h4>
				<div className={style.popularListContainer}>
					<PopularListItem />
				</div>
			</div>
		</div>
	);
};
