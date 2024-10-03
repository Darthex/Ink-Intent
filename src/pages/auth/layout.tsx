import React, { Fragment, useState } from 'react';
import SlidingForm from '../../components/sliding-form/sliding-form.tsx';
import Login from './login.tsx';
import Register from './register.tsx';

import styles from './layout.module.css';
import BubbleButton from '../../components/bubble-button/bubble-button.tsx';

export type FormType = 'login' | 'register';

type FormC = {
	[key: FormType]: React.ReactNode;
};

const forms: FormC = {
	login: Login,
	register: Register,
};

const Layout = () => {
	const [selectedNode, setSelectedNode] = useState<FormType>('login');
	const FormComponent = forms[selectedNode];

	return (
		<div className={styles.container}>
			<div className={styles.actionButtons}>
				<BubbleButton onClick={() => setSelectedNode('login')}>
					LOGIN
				</BubbleButton>
				<BubbleButton onClick={() => setSelectedNode('register')}>
					REGISTER
				</BubbleButton>
			</div>
			<SlidingForm id={selectedNode} selectedNode={selectedNode}>
				{/* eslint-disable-next-line react/jsx-no-useless-fragment */}
				<Fragment>
					<div className={styles.formContainer}>
						<div className={styles.formBody}>
							<FormComponent />
						</div>
					</div>
				</Fragment>
			</SlidingForm>
		</div>
	);
};

export default Layout;
