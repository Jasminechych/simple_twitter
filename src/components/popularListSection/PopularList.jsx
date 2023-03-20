import style from 'src/components/PopularListSection/PopularList.module.scss';
import { PopularListItem } from 'src/components/PopularListSection/PopularListItem';

export const PopularList = () => {
	return (
		<div className={style.popularListContainer}>
			<PopularListItem name='Miki Lin' />
			<PopularListItem name='Jasmine' />
		</div>
	);
};
