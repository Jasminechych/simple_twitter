import style from 'src/components/popularListSection/PopularList.module.scss';
import { PopularListItem } from 'src/components/popularListSection/PopularListItem';

export const PopularList = () => {
	return (
		<div className={style.popularListContainer}>
			<PopularListItem name='Miki Lin' />
			<PopularListItem name='Jasmine' />
		</div>
	);
};
