import { Logo, HomeOutline, HomeFilled, UserOutline, UserFilled, Logout } from 'src/assets/icons';
import style from 'src/components/AdminSidebar/AdminSidebar.module.scss';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { SidebarTab } from 'src/components/SidebarTab/SidebarTab';

export const AdminSidebar = () => {
	const location = useLocation();
	const currentPath = location.pathname;
	const navigate = useNavigate();

	const handleClick = () => {
		localStorage.removeItem('token');
		navigate('/adminsignin');
	};

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
			<div className={style.logout} onClick={handleClick}>
				<Logout />
				<h5>登出</h5>
			</div>
		</nav>
	);
};
