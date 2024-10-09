import { useNavigate } from 'react-router-dom';

import { useAppSelector } from '../../redux-tlkt/hooks.ts';
import { RootState } from '../../redux-tlkt/store.ts';

import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar.tsx';
import { Button } from '../ui/button.tsx';
import Inker from '../inker/inker.tsx';
import Quill from '../../svgs/quill.tsx';
import SearchBar from '../search-bar/search-bar.tsx';

import { ROUTES } from '../../constants/routes.ts';

import styles from './header.module.css';

const Header = () => {
	const navigate = useNavigate();
	const { user, isAuthenticated } = useAppSelector(
		(state: RootState) => state.root.auth
	);

	return (
		<div className={styles.layout}>
			<Inker size="medium" onClick={() => navigate(ROUTES.DASHBOARD)} />
			<div className={styles.actions}>
				<SearchBar />
				<Button
					variant="ghost"
					size="icon"
					onClick={() => navigate(ROUTES.WRITE)}
				>
					<Quill />
				</Button>
				{!isAuthenticated ? (
					<Button onClick={() => navigate(ROUTES.AUTH)}>Login</Button>
				) : (
					<Avatar
						onClick={() => navigate(ROUTES.AUTH)}
						style={{ cursor: 'pointer' }}
					>
						<AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
						<AvatarFallback>
							{(user as any)?.email[0].toUpperCase()}
						</AvatarFallback>
					</Avatar>
				)}
			</div>
		</div>
	);
};

export default Header;
