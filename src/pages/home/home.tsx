import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import BubbleButton from '../../components/bubble-button/bubble-button.tsx';
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
				<BubbleButton onClick={() => navigate(ROUTES.AUTH)}>Login</BubbleButton>
				<BubbleButton onClick={() => navigate(ROUTES.DASHBOARD)}>
					Get Started
				</BubbleButton>
			</div>
			<CSSTransition
				in={popTitle}
				nodeRef={nodeRef}
				timeout={300}
				classNames="pop"
				unmountOnExit
			>
				<h1 className="title" ref={nodeRef}>
					Ink & Intent
				</h1>
			</CSSTransition>
		</div>
	);
};

export default Home;
