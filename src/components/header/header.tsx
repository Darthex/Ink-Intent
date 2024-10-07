import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar.tsx';
import { Input } from '../ui/input.tsx';
import Inker from '../inker/inker.tsx';
import Quill from '../../svgs/quill.jsx';

import { ROUTES } from '../../constants/routes.ts';

import styles from './header.module.css';

const Header = () => {
	const navigate = useNavigate();

	return (
		<div className={styles.layout}>
			<Inker size="medium" />
			<div className={styles.actions}>
				<Input placeholder="Search" />
				<Quill />
				<Avatar
					onClick={() => navigate(ROUTES.AUTH)}
					style={{ cursor: 'pointer' }}
				>
					<AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
					<AvatarFallback>HS</AvatarFallback>
				</Avatar>
			</div>
		</div>
	);
};

export default Header;
