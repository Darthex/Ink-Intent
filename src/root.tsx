import { useState, useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from './redux-tlkt/hooks.ts';
import { RootState } from './redux-tlkt/store.ts';

import Home from './pages/home/home.tsx';
import Dashboard from './pages/dashboard/dashboard.tsx';
import AuthLayout from './pages/auth/layout.tsx';
import Write from './pages/write/write.tsx';
import Header from './components/header/header.tsx';
import { Toaster } from './components/ui/sonner.tsx';

import { ROUTES } from './constants/routes.ts';
import { validateSession } from './utils/workflow.ts';

import './index.css';

const Root = () => {
	const [autoLoginCheck, setAutoLoginCheck] = useState(false);
	const { isAuthenticated } = useAppSelector(
		(state: RootState) => state.root.auth
	);
	const dispatch = useAppDispatch();
	const location = useLocation();
	const navigate = useNavigate();
	const pageVisibility = ![ROUTES.HOME, ROUTES.AUTH].includes(
		location.pathname
	);

	useEffect(() => {
		validateSession(dispatch).then(() => setAutoLoginCheck(true));
	}, []);

	useEffect(() => {
		if (
			autoLoginCheck &&
			!isAuthenticated &&
			[ROUTES.WRITE].includes(location.pathname)
		) {
			navigate(ROUTES.AUTH, {
				replace: true,
				state: { from: location },
			});
		}
	}, [location, isAuthenticated, navigate, autoLoginCheck]);

	return (
		<>
			<Toaster />
			<>
				{pageVisibility && <Header />}
				<Routes>
					<Route path={ROUTES.HOME} element={<Home />} />
					<Route path={ROUTES.AUTH} element={<AuthLayout />} />
				</Routes>
				<div className="app-layout">
					<Routes>
						<Route path="*" element={<span>Not Found</span>} />
						<Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
						{isAuthenticated && (
							<Route path={ROUTES.WRITE} element={<Write />} />
						)}
					</Routes>
				</div>
			</>
		</>
		// <>
		// 	<Toaster />
		// 	<Routes>
		// 		<Route path={ROUTES.HOME} element={<Home />} />
		// 		<Route path={ROUTES.AUTH} element={<AuthLayout />} />
		// 	</Routes>
		// 	{!isAuthenticated && pageVisibility && (
		// 		<>
		// 			<Header />
		// 			<div className="app-layout">
		// 				<Routes>
		// 					<Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
		// 					<Route path="*" element={<span>Not Found</span>} />
		// 				</Routes>
		// 			</div>
		// 		</>
		// 	)}
		// </>
	);
};

export default Root;
