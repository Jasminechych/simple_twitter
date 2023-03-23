import { ReactComponent as Logo } from 'src/assets/icons/logo.svg';
import { ReactComponent as Home } from 'src/assets/icons/home-outline.svg';
import { ReactComponent as User } from 'src/assets/icons/user-outline.svg';
import { ReactComponent as Logout } from 'src/assets/icons/logout.svg';
import style from 'src/components/AdminSidebar/AdminSidebar.module.scss';

export const AdminSidebar = ({ handlePageChange }) => {
	return (
		<nav className={style.sidebar}>
			<div className={style.logo}>
				<Logo />
			</div>

			<ul className={style.tabGroupContainer}>
				<a className={style.tabGroup} onClick={() => handlePageChange('tweetList')}>
					<Home />
					<h5>推文清單</h5>
				</a>
				<a className={style.tabGroup} onClick={() => handlePageChange('userList')}>
					<User />
					<h5>使用者列表</h5>
				</a>
				<a
					className={`${style.tabGroup} ${style.logout}`}
					onClick={() => handlePageChange('logout')}
				>
					<Logout />
					<h5>登出</h5>
				</a>
			</ul>
		</nav>
	);
};
