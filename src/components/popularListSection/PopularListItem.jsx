import style from 'src/components/popularListSection/PopularListItem.module.scss';

export const PopularListItem = ({ name }) => {
	return (
		<div className={style.popularListItemContainer}>
			<div className={style.popularListItemUserPhoto}>
				<img
					src='https://stickershop.line-scdn.net/stickershop/v1/product/5077/LINEStorePC/main.png'
					alt=''
					className={style.userPhoto}
				/>
			</div>
			<div className={style.popularListItemNameAndButton}>
				<div className={style.popularListItemUserNameWrapper}>
					<div className={style.popularListItemUserName}>{name}</div>
					<div className={style.popularListItemUserSubName}>@{name}</div>
				</div>
				<button className={style.popularListItemButton}>正在追隨</button>
			</div>
		</div>
	);
};
