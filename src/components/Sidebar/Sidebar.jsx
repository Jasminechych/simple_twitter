import style from 'src/components/Sidebar/Sidebar.module.scss';
import {
	Logo,
	HomeOutline,
	HomeFilled,
	UserOutline,
	UserFilled,
	Logout,
	CogFilled,
	CogOutline,
} from 'src/assets/icons';
import { ButtonL } from 'src/components/buttons';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { SidebarTab } from '../SidebarTab/SidebarTab';

export const Sidebar = () => {
	const location = useLocation();
	const currentPath = location.pathname;
	const navigate = useNavigate();
	console.log('currentPath', currentPath);

	// 如過路徑以 /user 開頭設為 true
	const userPath = currentPath.startsWith('/user/');
	console.log('userPath', userPath);

	// 登出
	const handleLogOutClick = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('currentUser');
		navigate('/signin');
	};

	return (
		<nav className={style.sidebarContainer}>
			<div className={style.sidebarWrapper}>
				<ul className={style.sidebarItemWrapper}>
					<Link className={style.sidebarLogo} to='/main'>
						<Logo />
					</Link>
					<SidebarTab
						path='/main'
						text='首頁'
						icon={currentPath === '/main' ? <HomeFilled /> : <HomeOutline />}
						isActiveText={currentPath === '/main'}
					/>
					<SidebarTab
						path='/user/self'
						text='個人資料'
						icon={userPath ? <UserFilled /> : <UserOutline />}
						isActiveText={userPath}
					/>
					<SidebarTab
						path='/setting'
						text='設定'
						icon={currentPath === '/setting' ? <CogFilled /> : <CogOutline />}
						isActiveText={currentPath === '/setting'}
					/>
				</ul>
				<Link to='/main/tweet'>
					<ButtonL text='推文' className={style.button} />
				</Link>
			</div>
			<div className={style.logout} to='/signin' onClick={handleLogOutClick}>
				<Logout />
				<h5 className={style.logoutTitle}>登出</h5>
			</div>
		</nav>
	);
};
