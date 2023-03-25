import style from 'src/components/AdminUsersSection/AdminUsersSection.module.scss';

export const AdminUsersSection = ({ title, children }) => {
	return (
		<main className={style.mainSection}>
			<h4 className={style.mainTitle}>{title}</h4>
			{children}
		</main>
	);
};
