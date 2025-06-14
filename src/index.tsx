import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import { App } from './components/app';
import store from './services/store';
import './styles.css';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);
root.render(
	<Provider store={store}>
		<Router basename='/'>
			<App />
		</Router>
	</Provider>
);
