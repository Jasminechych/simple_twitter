import { AdminSidebar } from 'src/components/AdminSidebar/AdminSidebar';
import style from 'src/pages/AdminMainPage/AdminMainPage.module.scss';
import { Outlet } from 'react-router-dom';

export const AdminMainPage = () => {
	return (
		<div className={style.page}>
			<AdminSidebar />
			<Outlet />
		</div>
	);
};
