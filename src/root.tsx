import { Route, Routes } from 'react-router-dom';

import Home from './pages/home/home.tsx';
import Dashboard from './pages/dashboard/dashboard.tsx';
import AuthLayout from './pages/auth/layout.tsx';

import { ROUTES } from './constants/routes.ts';

function Root() {
	return (
		<Routes>
			<Route path={ROUTES.HOME} element={<Home />} />
			<Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
			<Route path={ROUTES.AUTH} element={<AuthLayout />} />
		</Routes>
	);
}

export default Root;
