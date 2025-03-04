import { Routes, Route } from 'react-router-dom';
import AppHeader from '../app-header/app-header';
import { Home } from '../../pages/home/Home';
import styles from './app.module.scss';

export const App = () => {
	return (
		<div className={styles.page}>
			<AppHeader />
			<Routes>
				<Route path='/' element={<Home />} />
			</Routes>
		</div>
	);
};
