import style from 'src/components/AdminTweetsSection/AdminTweetsSection.module.scss';

export const AdminTweetsSection = ({ title, children }) => {
	return (
		<main className={style.mainSection}>
			<h4 className={style.mainTitle}>{title}</h4>
			{children}
		</main>
	);
};
