import styles from './app.module.scss';
import AppHeader from '../app-header/app-header';

export const App = () => {
	return (
		<div className={styles.page}>
			<AppHeader />
			<main className={styles.main}></main>
		</div>
	);
};
