import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';
import App from './components/app/app';
import store from './services/slices';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
	<Provider store={store}>
		<App />
	</Provider>
);
