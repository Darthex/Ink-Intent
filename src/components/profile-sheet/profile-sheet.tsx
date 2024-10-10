import { useEffect, useState } from 'react';
import { type NavigateFunction } from 'react-router-dom';

import { useUserUpdateMutation } from '../../redux-tlkt/api-injections/auth/user-update.ts';

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar.tsx';
import { Button } from '../ui/button.tsx';
import { Label } from '../ui/label.tsx';
import { Input } from '../ui/input.tsx';
import Logout from '../../svgs/logout.tsx';
import SheetWrapper from '../sheet/sheet.tsx';
import createToast, { generateError } from '../../utils/toasts.ts';

import { ROUTES } from '../../constants/routes.ts';
import { updateSession, getUsername } from '../../utils/sessions.ts';

import styles from './profile-sheet.module.css';

type Props = {
	isAuthenticated: boolean;
	user: {
		id: string;
		username: string;
	};
	navigate: NavigateFunction;
};

const ProfileSheet = ({ isAuthenticated, user, navigate }: Props) => {
	const [username, setUsername] = useState(user.username || getUsername());
	const [triggerUserUpdate, { isLoading, isSuccess, isError, error }] =
		useUserUpdateMutation();

	const handleUpdateUser = () => {
		triggerUserUpdate({
			data: {
				username,
				id: user.id,
			},
		});
	};

	const renderSheetTrigger = () => {
		return (
			<Avatar style={{ cursor: 'pointer' }}>
				<AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
				<AvatarFallback>{(user as any)?.email[0].toUpperCase()}</AvatarFallback>
			</Avatar>
		);
	};

	const renderSheetBody = () => {
		return (
			<div className="grid gap-4 py-4">
				<div className="grid grid-cols-4 items-center gap-4">
					<Label htmlFor="username" className="text-right">
						Username
					</Label>
					<Input
						value={username}
						className="col-span-3"
						onChange={(e) => setUsername(e.target.value)}
					/>
				</div>
			</div>
		);
	};

	const renderSheetFooter = () => {
		return (
			<div>
				<Button
					variant="link"
					className={styles.footerButton}
					onClick={() => navigate(ROUTES.AUTH)}
				>
					<Logout />
					Logout
				</Button>
			</div>
		);
	};

	useEffect(() => {
		if (isSuccess) {
			createToast({
				type: 'success',
				title: 'Username updated.',
			});
			updateSession(username);
		}
		if (isError) {
			createToast({
				type: 'error',
				title: `Couldn't update username, try again.`,
				description: generateError(error),
			});
		}
	}, [isSuccess, isError]);

	return !isAuthenticated ? (
		<Button onClick={() => navigate(ROUTES.AUTH)}>Login</Button>
	) : (
		<SheetWrapper
			trigger={renderSheetTrigger()}
			title="Edit Profile"
			description="Make changes to your profile here. Click save when you're done."
			body={renderSheetBody()}
			footer="Save changes"
			onClick={handleUpdateUser}
			loading={isLoading}
			extraContent={renderSheetFooter()}
			footerClassName={styles.sheetFooter}
		/>
	);
};

export default ProfileSheet;
