import { useEffect, useState, type ChangeEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../../redux-tlkt/hooks.ts';

import { Button } from '../../components/ui/button.tsx';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
} from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from '../../components/ui/tabs';
import Inker from '../../components/inker/inker.tsx';
import Loader from '../../components/loader/loader.tsx';
import createToast, { generateError } from '../../utils/toasts.ts';

import { validators } from '../../utils/validators.ts';
import { ROUTES } from '../../constants/routes.ts';
import {
	useLoginMutation,
	useRegisterMutation,
} from '../../redux-tlkt/api-injections/auth/auth.ts';
import { workflowStarted } from '../../utils/workflow.ts';

import styles from './layout.module.css';

type FormType = 'login' | 'register';

type FieldType = 'email' | 'password' | 'username';

type FormError = {
	email: {
		message: string;
		show: boolean;
	};
	password: {
		message: string;
		show: boolean;
	};
	username: {
		message: string;
		show: boolean;
	};
};

const errorInit = {
	email: { message: '', show: false },
	password: { message: '', show: false },
	username: { message: '', show: false },
};

const formInit = {
	login: { email: '', password: '' },
	register: { email: '', password: '', username: '' },
};

const validateErrors = (inputs: {
	email: string;
	password: string;
	username?: string;
}) => {
	const errors: FormError = {
		email: { message: '', show: true },
		password: { message: '', show: true },
		username: { message: '', show: true },
	};
	if (
		inputs.username !== undefined &&
		validators.requiredAndNoWhiteSpace({
			value: inputs.username,
			entity: 'Username',
		})
	) {
		errors.username.message = validators.requiredAndNoWhiteSpace({
			value: inputs.username,
			entity: 'Username',
		}) as string;
	}
	if (
		validators.validEmail(inputs.email) ||
		validators.requiredAndNoWhiteSpace({ value: inputs.email, entity: 'Email' })
	) {
		errors.email.message =
			validators.validEmail(inputs.email) ||
			(validators.requiredAndNoWhiteSpace({
				value: inputs.email,
				entity: 'Email',
			}) as string);
	}
	if (
		validators.requiredAndNoWhiteSpace({
			value: inputs.password,
			entity: 'Password',
		}) ||
		validators.minLength({
			value: inputs.password,
			min: 4,
			entity: 'Password',
		}) ||
		validators.maxLength({
			value: inputs.password,
			max: 12,
			entity: 'Password',
		})
	) {
		errors.password.message = (validators.requiredAndNoWhiteSpace({
			value: inputs.password,
			entity: 'Password',
		}) ||
			validators.minLength({
				value: inputs.password,
				min: 4,
				entity: 'Password',
			}) ||
			validators.maxLength({
				value: inputs.password,
				max: 12,
				entity: 'Password',
			})) as string;
	}
	return errors;
};

const Layout = () => {
	const [tab, setTab] = useState('Login');
	const [authForm, setAuthForm] = useState(formInit);
	const [errors, setErrors] = useState<{
		login: FormError;
		register: FormError;
	}>({
		login: errorInit,
		register: errorInit,
	});
	const [triggerLogin, { isLoading: loginLoading }] = useLoginMutation();
	const [
		triggerRegister,
		{ isLoading: registerLoading, isSuccess, isError, error: apiError },
	] = useRegisterMutation();
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const fromWrite = location.state?.from?.pathname === ROUTES.WRITE;

	const handleLogin = () => {
		const fieldErrors = validateErrors(authForm.login);
		if (!fieldErrors.email.message && !fieldErrors.password.message) {
			triggerLogin({
				argument: {
					data: authForm.login,
					navigate,
				},
			});
			setAuthForm(formInit);
		} else {
			setErrors((prevState) => ({
				...prevState,
				login: fieldErrors,
			}));
		}
	};

	const handleRegistration = () => {
		const fieldErrors = validateErrors(authForm.register);
		if (!fieldErrors.email.message && !fieldErrors.password.message) {
			triggerRegister({
				data: authForm.register,
			});
			setAuthForm(formInit);
		} else {
			setErrors((prevState) => ({
				...prevState,
				register: fieldErrors,
			}));
		}
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>, type: FormType) => {
		setAuthForm((prevState) => ({
			...prevState,
			[type]: {
				...prevState[type],
				[e.target.id]: e.target.value,
			},
		}));
		const fieldId = e.target.id as FieldType;
		setErrors((prevState) => ({
			...prevState,
			[type]: {
				...prevState[type],
				[fieldId]: {
					...prevState[type][fieldId],
					show: false,
				},
			},
		}));
	};

	useEffect(() => {
		if (isSuccess) {
			createToast({
				type: 'success',
				title: 'User created. Please login',
				actionLabel: 'Ok',
			});
			setTab('Login');
		}
		if (isError) {
			createToast({
				type: 'error',
				description: generateError((apiError as any)?.error),
				title: 'An error occurred while registering',
				actionLabel: 'Ok',
			});
		}
	}, [isError, isSuccess]);

	useEffect(() => {
		if (fromWrite) {
			createToast({
				title: 'Please Login to start writing',
			});
		}
	}, [fromWrite]);

	useEffect(() => {
		workflowStarted(dispatch);
	}, []);

	return (
		<div className={styles.container}>
			<Inker />
			<Tabs defaultValue="Login" className="w-[350px] lg:w-[400px]" value={tab}>
				<TabsList className="grid w-full grid-cols-2">
					<TabsTrigger
						value="Login"
						disabled={registerLoading}
						onClick={() => setTab('Login')}
					>
						Login
					</TabsTrigger>
					<TabsTrigger
						value="Register"
						disabled={loginLoading}
						onClick={() => setTab('Register')}
					>
						Register
					</TabsTrigger>
				</TabsList>
				<TabsContent value="Login">
					<Card>
						<CardHeader>
							<CardDescription>
								Login to your existing Ink account. Click on Register if you are
								a new user.
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-2">
							<div className="space-y-1">
								<Label htmlFor="name">
									Email
									{errors.login.email.show && errors.login.email.message && (
										<span className={styles.error}>
											{' '}
											- {errors.login.email.message}
										</span>
									)}
								</Label>
								<Input
									id="email"
									type="email"
									placeholder="johndoe@hotmail.co"
									value={authForm.login.email}
									onChange={(e) => handleChange(e, 'login')}
								/>
							</div>
							<div className="space-y-1">
								<Label htmlFor="username">
									Password
									{errors.login.password.show &&
										errors.login.password.message && (
											<span className={styles.error}>
												{' '}
												- {errors.login.password.message}
											</span>
										)}
								</Label>
								<Input
									id="password"
									type="password"
									placeholder="@johndoe"
									value={authForm.login.password}
									onChange={(e) => handleChange(e, 'login')}
								/>
							</div>
						</CardContent>
						<CardFooter>
							<Button onClick={handleLogin} disabled={loginLoading}>
								{loginLoading ? <Loader /> : <>Login</>}
							</Button>
						</CardFooter>
					</Card>
				</TabsContent>
				<TabsContent value="Register">
					<Card>
						<CardHeader>
							<CardDescription>
								New User? Welcome to the best blog post dump. Register now.
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-2">
							<div className="space-y-1">
								<Label htmlFor="name">
									Username
									{errors.register.username.show &&
										errors.register.username.message && (
											<span className={styles.error}>
												{' '}
												- {errors.register.username.message}
											</span>
										)}
								</Label>
								<Input
									id="username"
									type="text"
									placeholder="johnDoe"
									value={authForm.register.username}
									onChange={(e) => handleChange(e, 'register')}
								/>
							</div>
							<div className="space-y-1">
								<Label htmlFor="current">
									Email
									{errors.register.email.show &&
										errors.register.email.message && (
											<span className={styles.error}>
												{' '}
												- {errors.register.email.message}
											</span>
										)}
								</Label>
								<Input
									id="email"
									type="email"
									placeholder="johndoe@hotmail.co"
									value={authForm.register.email}
									onChange={(e) => handleChange(e, 'register')}
								/>
							</div>
							<div className="space-y-1">
								<Label htmlFor="new">
									Password
									{errors.register.password.show &&
										errors.register.password.message && (
											<span className={styles.error}>
												{' '}
												- {errors.register.password.message}
											</span>
										)}
								</Label>
								<Input
									id="password"
									type="password"
									placeholder="@johndoe"
									value={authForm.register.password}
									onChange={(e) => handleChange(e, 'register')}
								/>
							</div>
						</CardContent>
						<CardFooter>
							<Button onClick={handleRegistration} disabled={registerLoading}>
								{registerLoading ? <Loader /> : <>Register</>}
							</Button>
						</CardFooter>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
};

export default Layout;
