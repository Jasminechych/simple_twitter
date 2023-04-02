import { AdminSidebar } from 'src/components/AdminSidebar/AdminSidebar';
import style from 'src/pages/AdminMainPage/AdminMainPage.module.scss';
import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const AdminMainPage = () => {
	const navigate = useNavigate();
	// 先驗證token，若無則直接回到login
	const token = localStorage.getItem('token');

	useEffect(() => {
		if (!token) {
			navigate('/signin');
			return;
		}
	}, [token]);

	return (
		<div className={style.page}>
			<AdminSidebar />
			<Outlet />
		</div>
	);
};
