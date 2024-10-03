import { Route, Routes } from 'react-router-dom';

import Home from './pages/home/home.tsx';

import { ROUTES } from './constants/routes.ts';

function Root() {
	return (
		<Routes>
			<Route path={ROUTES.HOME} element={<Home />} />
		</Routes>
	);
}

export default Root;
