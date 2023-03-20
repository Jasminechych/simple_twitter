import style from 'src/components/Sidebar/Sidebar.module.scss';
import { ReactComponent as Logo } from 'src/assets/icons/logo.svg';
import { ReactComponent as Home } from 'src/assets/icons/home-outline.svg';
import { ReactComponent as User } from 'src/assets/icons/user-outline.svg';
import { ReactComponent as Cog } from 'src/assets/icons/cog-outline.svg';

export const Sidebar = () => {
	return (
		<div className={style.sidebarContainer}>
			<a href='' className={style.sidebarLogo}>
				<Logo />
			</a>
			<div className={style.sidebarItemWrapper}>
				<div className={style.sidebarItem}>
					<Home className={style.sidebarIcon} />
					<div className={style.sidebarTitle}>首頁</div>
				</div>
				<div className={style.sidebarItem}>
					<User className={style.sidebarUserIcon} />
					<div className={style.sidebarTitle}>個人資料</div>
				</div>
				<div className={style.sidebarItem}>
					<Cog className={style.sidebarIcon} />
					<div className={style.sidebarTitle}>設定</div>
				</div>
			</div>
			<button className={style.sidebarButton}>推文</button>
		</div>
	);
};
