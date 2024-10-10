import {
	createRef,
	type KeyboardEvent,
	useEffect,
	useRef,
	useState,
} from 'react';
import { CSSTransition } from 'react-transition-group';
import cx from 'classnames';

import Add from '../../svgs/Add.tsx';
import styles from './write.module.css';
import '../home/home.css';

// TODO: discarding for now, as its getting too complicated and still fill of bugs
const Write = () => {
	const [title, setTitle] = useState('');
	const [dynamicTextBox, setDynamicTextBox] = useState<number[]>([]);
	const [expanded, setExpanded] = useState(false);
	const nodeRef = useRef(null);
	const dynamicRefs = useRef<any>({});
	const titleRef = useRef<HTMLInputElement>(null);

	const [lastAddedIndex, setLastAddedIndex] = useState<number | null>(null);
	const [, setCurrentFocusIndex] = useState<number | null>(null);

	const createDynamicRef = (index: number) => {
		if (!dynamicRefs.current[index]) {
			dynamicRefs.current[index] = createRef();
		}
		return dynamicRefs.current[index];
	};

	const handleRefReassign = (
		e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
		index: number
	) => {
		const value = (e.currentTarget as HTMLTextAreaElement | HTMLInputElement)
			.value;

		if (value.trim() && e.code === 'Enter') {
			e.preventDefault();
			const newIndex = dynamicTextBox.length;
			setDynamicTextBox((prevState) => {
				const newState = [...prevState];
				newState.splice(index, 0, newIndex);
				setLastAddedIndex(newIndex);
				return newState;
			});
		}

		if (e.code === 'Backspace' && value === '') {
			e.preventDefault();
			if (index === 0 && dynamicTextBox.length === 0) {
				titleRef.current?.focus();
			} else if (index === 1 && dynamicTextBox.length > 0) {
				setDynamicTextBox((prevState) => {
					const newState = [...prevState];
					newState.splice(index - 1, 1);
					setLastAddedIndex(null);
					return newState;
				});
				titleRef.current?.focus();
			} else if (index > 1) {
				setDynamicTextBox((prevState) => {
					const newState = [...prevState];
					newState.splice(index - 1, 1);
					setLastAddedIndex(newState[index - 1 - 1]);
					return newState;
				});
			}
		}
	};

	const handleFocus = (index: number) => {
		setCurrentFocusIndex(index);
	};

	useEffect(() => {
		if (lastAddedIndex !== null && dynamicRefs.current[lastAddedIndex]) {
			dynamicRefs.current[lastAddedIndex].current.focus();
		}
	}, [lastAddedIndex]);

	return (
		<div className={styles.container}>
			<article>
				<section className={styles.titleSection}>
					<div
						className={cx(styles.addButton, {
							[styles.crossButton]: expanded,
						})}
						ref={nodeRef}
						onClick={() => setExpanded((prevState) => !prevState)}
					>
						<CSSTransition
							in={!title}
							timeout={500}
							unmountOnExit
							nodeRef={nodeRef}
							classNames="pop"
						>
							<Add size="large" ref={nodeRef} />
						</CSSTransition>
					</div>
					<div className={styles.input}>
						<input
							ref={titleRef}
							className={styles.title}
							placeholder="Title"
							onChange={(e) => setTitle(e.target.value)}
							onKeyDown={(e) => handleRefReassign(e, 0)}
						/>
					</div>
				</section>
				<section>
					{dynamicTextBox.map((num, idx) => (
						<div key={num} className={styles.textSection}>
							<div>
								<CSSTransition
									in={true}
									timeout={500}
									unmountOnExit
									nodeRef={nodeRef}
									classNames="pop"
								>
									<Add size="medium" ref={nodeRef} />
								</CSSTransition>
							</div>
							<textarea
								ref={createDynamicRef(num)}
								onKeyDown={(e) => handleRefReassign(e, idx + 1)}
								onFocus={() => handleFocus(idx)}
								className={styles.textBox}
							/>
						</div>
					))}
				</section>
			</article>
		</div>
	);
};

export default Write;
