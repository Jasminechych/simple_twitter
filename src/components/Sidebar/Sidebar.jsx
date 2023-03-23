import style from 'src/components/Sidebar/Sidebar.module.scss';
import { ReactComponent as Logo } from 'src/assets/icons/logo.svg';
import { ReactComponent as Home } from 'src/assets/icons/home-outline.svg';
import { ReactComponent as User } from 'src/assets/icons/user-outline.svg';
import { ReactComponent as Cog } from 'src/assets/icons/cog-outline.svg';
import { ReactComponent as Logout } from 'src/assets/icons/logout.svg';
import { ButtonL } from 'src/components/buttons';

export const Sidebar = () => {
	return (
		<div className={style.sidebarContainer}>
			<div className={style.sidebarWrapper}>
				<a href='' className={style.sidebarLogo}>
					<Logo />
				</a>
				<div className={style.sidebarItemWrapper}>
					<a href='' className={style.sidebarItem}>
						<div className={style.iconContainer}>
							<Home className={style.sidebarIcon} />
						</div>
						<h5 className={style.sidebarTitle}>首頁</h5>
					</a>
					<a href='' className={style.sidebarItem}>
						<div className={style.iconContainer}>
							<User className={style.sidebarUserIcon} />
						</div>
						<h5 className={style.sidebarTitle}>個人資料</h5>
					</a>
					<a href='' className={style.sidebarItem}>
						<div className={style.iconContainer}>
							<Cog className={style.sidebarIcon} />
						</div>
						<h5 className={style.sidebarTitle}>設定</h5>
					</a>
				</div>
				<ButtonL text='推文' className={style.button} />
			</div>
			<a href='' className={style.logout}>
				<Logout />
				<h5 className={style.logoutTitle}>登出</h5>
			</a>
		</div>
	);
};
