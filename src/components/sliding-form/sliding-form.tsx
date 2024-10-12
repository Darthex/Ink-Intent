import React, { type ReactNode } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './sliding-form.css';

type Props = {
	children: ReactNode;
	id: string;
	selectedNode: any;
};

const SlidingForm = ({ children, id, selectedNode }: Props) => {
	const transitionClasses = {
		enter: selectedNode === 'register' ? 'rl-enter' : 'lr-enter',
		enterActive:
			selectedNode === 'register' ? 'rl-enter-active' : 'lr-enter-active',
		exit: selectedNode === 'register' ? 'rl-exit' : 'lr-exit',
		exitActive:
			selectedNode === 'register' ? 'rl-exit-active' : 'lr-exit-active',
	};

	return (
		<TransitionGroup
			childFactory={(child) =>
				React.cloneElement(child, { className: transitionClasses })
			}
			component={null}
		>
			<CSSTransition
				classNames={transitionClasses}
				timeout={500}
				unmountOnExit
				key={id}
			>
				{children}
			</CSSTransition>
		</TransitionGroup>
	);
};

export default SlidingForm;
