import { Logo, HomeOutline, HomeFilled, UserOutline, UserFilled, Logout } from 'src/assets/icons';
import style from 'src/components/AdminSidebar/AdminSidebar.module.scss';
import { Link, useLocation } from 'react-router-dom';
import { SidebarTab } from 'src/components/SidebarTab/SidebarTab';

export const AdminSidebar = () => {
	const location = useLocation();
	const currentPath = location.pathname;

	return (
		<nav className={style.sidebar}>
			<Link to='/admin/tweets' className={style.logo}>
				<Logo />
			</Link>
			<ul className={style.tabGroupContainer}>
				<SidebarTab
					path='/admin/tweets'
					text='推文清單'
					icon={currentPath === '/admin/tweets' ? <HomeFilled /> : <HomeOutline />}
					isActiveText={currentPath === '/admin/tweets'}
				/>
				<SidebarTab
					path='/admin/users'
					text='使用者列表'
					icon={currentPath === '/admin/users' ? <UserFilled /> : <UserOutline />}
					isActiveText={currentPath === '/admin/users'}
				/>
			</ul>
			<SidebarTab path='/signin' text='登出' icon={<Logout />} className={style.logout} />
		</nav>
	);
};
