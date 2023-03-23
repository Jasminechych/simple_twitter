import style from 'src/components/AdminMainSection/AdminMainSection.module.scss';

export const AdminMainSection = ({ pageTitle, children }) => {
	return (
		<main className={style.mainSection}>
			<h4 className={style.mainTitle}>{pageTitle}</h4>
			{children}
		</main>
	);
};
