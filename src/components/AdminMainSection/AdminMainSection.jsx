import style from 'src/components/AdminMainSection/AdminMainSection.module.scss';

export const AdminMainSection = ({ title, children }) => {
	return (
		<main className={style.mainSection}>
			<h4 className={style.mainTitle}>{title}</h4>
			{children}
		</main>
	);
};
