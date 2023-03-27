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

	const handleClick = () => {
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
						icon={currentPath === '/user/self' ? <UserFilled /> : <UserOutline />}
						isActiveText={currentPath === '/user/self'}
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
			<div className={style.logout} to='/signin' onClick={handleClick}>
				<Logout />
				<h5 className={style.logoutTitle}>登出</h5>
			</div>
		</nav>
	);
};
