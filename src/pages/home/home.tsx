import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import BubbleLink from '../../components/bubble-link/bubble-link.tsx';
import Inker from '../../components/inker/inker.tsx';

import { ROUTES } from '../../constants/routes.ts';

import './home.css';

const Home = () => {
	const [popTitle, setPopTitle] = useState(false);
	const navigate = useNavigate();
	const nodeRef = useRef(null);

	useEffect(() => {
		const timeOut = setTimeout(() => {
			setPopTitle(true);
		}, 1000);
		return () => {
			clearTimeout(timeOut);
		};
	}, []);

	return (
		<div className="container">
			<div className="background"></div>
			<div className="action-buttons">
				<BubbleLink onClick={() => navigate(ROUTES.AUTH)}>Login</BubbleLink>
				<BubbleLink onClick={() => navigate(ROUTES.DASHBOARD)}>
					Get Started
				</BubbleLink>
			</div>
			<CSSTransition
				in={popTitle}
				nodeRef={nodeRef}
				timeout={300}
				classNames="pop"
				unmountOnExit
			>
				<Inker ref={nodeRef} className="globalHomeTitle" />
			</CSSTransition>
		</div>
	);
};

export default Home;
