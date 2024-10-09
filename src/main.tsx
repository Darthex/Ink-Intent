import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Root from './root.tsx';

import store from './redux-tlkt/store.ts';
import { Provider } from 'react-redux';

import './index.css';

createRoot(document.getElementById('root')!).render(
	<Provider store={store}>
		<BrowserRouter>
			<Root />
		</BrowserRouter>
	</Provider>
);
