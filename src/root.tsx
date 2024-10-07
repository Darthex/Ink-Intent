import { Route, Routes } from 'react-router-dom';

import Home from './pages/home/home.tsx';
import Dashboard from './pages/dashboard/dashboard.tsx';
import AuthLayout from './pages/auth/layout.tsx';
import Header from './components/header/header.tsx';

import { ROUTES } from './constants/routes.ts';
import './index.css';

function Root({ isAuthenticated = true }) {
	return (
		<>
			<Routes>
				<Route path={ROUTES.HOME} element={<Home />} />
				<Route path={ROUTES.AUTH} element={<AuthLayout />} />
			</Routes>
			{isAuthenticated && (
				<>
					<Header />
					<div className="app-layout">
						<Routes>
							<Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
						</Routes>
					</div>
				</>
			)}
		</>
	);
}

export default Root;
