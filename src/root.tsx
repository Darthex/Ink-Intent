import { useState, useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from './redux-tlkt/hooks.ts';
import { RootState } from './redux-tlkt/store.ts';

import Home from './pages/home/home.tsx';
import Dashboard from './pages/dashboard/dashboard.tsx';
import AuthLayout from './pages/auth/layout.tsx';
import Read from './pages/read/read.tsx';
import Write from './pages/write/write-new.tsx';
import Header from './components/header/header.tsx';
import { Toaster } from './components/ui/sonner.tsx';

import { ROUTES } from './constants/routes.ts';
import { validateSession } from './utils/workflow.ts';
import { FTU } from './utils/sessions.ts';

import './index.css';

const Root = () => {
	const [autoLoginCheck, setAutoLoginCheck] = useState(false);
	const isFTU = FTU('get');
	const { isAuthenticated } = useAppSelector(
		(state: RootState) => state.root.auth
	);
	const dispatch = useAppDispatch();
	const location = useLocation();
	const navigate = useNavigate();
	const headerVisibility = ![
		ROUTES.HOME,
		ROUTES.AUTH,
		'/home/',
		'/auth/',
	].includes(location.pathname);

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
		if (isFTU) {
			navigate(ROUTES.HOME);
		}
	}, [location, isAuthenticated, navigate, autoLoginCheck, isFTU]);

	return (
		<>
			<Toaster />
			<>
				{headerVisibility && <Header />}
				<Routes>
					<Route path={ROUTES.HOME} element={<Home />} />
					<Route path={ROUTES.AUTH} element={<AuthLayout />} />
					<Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
					<Route path={ROUTES.READ} element={<Read />} />
					{isAuthenticated && (
						<>
							<Route path={ROUTES.WRITE} element={<Write />} />
							<Route path={ROUTES.EDIT} element={<Write isEdit />} />
						</>
					)}
					<Route path="*" element={<span>Not Found</span>} />
				</Routes>
			</>
		</>
	);
};

export default Root;
