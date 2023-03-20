import style from 'src/components/popularListSection/PopularListItem.module.scss';

export const PopularListItem = () => {
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
					<div className={style.popularListItemUserName}>Miki Lin</div>
					<div className={style.popularListItemUserSubName}>@MikiLin</div>
				</div>
				<button className={style.popularListItemButton}>正在追隨</button>
			</div>
		</div>
	);
};
