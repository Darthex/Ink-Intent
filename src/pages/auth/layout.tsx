import { useEffect, useState, type ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';

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

import { validators } from '../../utils/validators.ts';
import {
	useLoginMutation,
	useRegisterMutation,
} from '../../redux-tlkt/api-injections/auth/auth.ts';
import { workflowStarted } from '../../utils/workflow.ts';

import styles from './layout.module.css';

type FormType = 'login' | 'register';

type FieldType = 'email' | 'password';

type FormError = {
	email: {
		message: string;
		show: boolean;
	};
	password: {
		message: string;
		show: boolean;
	};
};

const init = {
	email: { message: '', show: false },
	password: { message: '', show: false },
};

const validateErrors = (inputs: { email: string; password: string }) => {
	const errors: FormError = {
		email: { message: '', show: true },
		password: { message: '', show: true },
	};
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

// TODO - notifications on error
const Layout = () => {
	const [tab, setTab] = useState('Login');
	const [authForm, setAuthForm] = useState({
		login: { email: '', password: '' },
		register: { email: '', password: '' },
	});
	const [errors, setErrors] = useState<{
		login: FormError;
		register: FormError;
	}>({
		login: init,
		register: init,
	});
	const [triggerLogin, { isLoading: loginLoading }] = useLoginMutation();
	const [triggerRegister, { isLoading: registerLoading, data: registerData }] =
		useRegisterMutation();
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const handleLogin = () => {
		const fieldErrors = validateErrors(authForm.login);
		if (!fieldErrors.email.message && !fieldErrors.password.message) {
			triggerLogin({
				argument: {
					data: authForm.login,
					navigate,
					dispatch,
				},
			});
			setAuthForm({
				login: { email: '', password: '' },
				register: { email: '', password: '' },
			});
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
			setAuthForm({
				login: { email: '', password: '' },
				register: { email: '', password: '' },
			});
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
		if (registerData?.['User created']) setTab('Login'); //fixme - Hack, might lead to bugs
	}, [registerData]);

	useEffect(() => {
		workflowStarted(dispatch);
	}, []);

	return (
		<div className={styles.container}>
			<Inker />
			<Tabs defaultValue="Login" className="w-[400px]" value={tab}>
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
								<Label htmlFor="current">Email</Label>
								<Input
									id="email"
									type="email"
									placeholder="johndoe@hotmail.co"
									value={authForm.register.email}
									onChange={(e) => handleChange(e, 'register')}
								/>
							</div>
							<div className="space-y-1">
								<Label htmlFor="new">Password</Label>
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
