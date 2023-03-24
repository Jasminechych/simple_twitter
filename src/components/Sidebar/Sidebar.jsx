import style from 'src/components/Sidebar/Sidebar.module.scss';
import { ReactComponent as Logo } from 'src/assets/icons/logo.svg';
import { ReactComponent as Home } from 'src/assets/icons/home-outline.svg';
import { ReactComponent as User } from 'src/assets/icons/user-outline.svg';
import { ReactComponent as Cog } from 'src/assets/icons/cog-outline.svg';
import { ReactComponent as Logout } from 'src/assets/icons/logout.svg';
import { ButtonL } from 'src/components/buttons';
import { Link } from 'react-router-dom';

export const Sidebar = () => {
	return (
		<div className={style.sidebarContainer}>
			<div className={style.sidebarWrapper}>
				<Link className={style.sidebarLogo} to='/main'>
					<Logo />
				</Link>
				<div className={style.sidebarItemWrapper}>
					<Link className={style.sidebarItem} to='/main'>
						<div className={style.iconContainer}>
							<Home className={style.sidebarIcon} />
						</div>
						<h5 className={style.sidebarTitle}>首頁</h5>
					</Link>
					<Link className={style.sidebarItem} to='/user/self'>
						<div className={style.iconContainer}>
							<User className={style.sidebarUserIcon} />
						</div>
						<h5 className={style.sidebarTitle}>個人資料</h5>
					</Link>
					<Link to='/setting' className={style.sidebarItem}>
						<div className={style.iconContainer}>
							<Cog className={style.sidebarIcon} />
						</div>
						<h5 className={style.sidebarTitle}>設定</h5>
					</Link>
				</div>
				<ButtonL text='推文' className={style.button} />
			</div>
			<Link href='' className={style.logout} to='/signin'>
				<Logout />
				<h5 className={style.logoutTitle}>登出</h5>
			</Link>
		</div>
	);
};
