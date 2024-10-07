import React from 'react';
import { useNavigate } from 'react-router-dom';
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

import styles from './layout.module.css';
import { ROUTES } from '../../constants/routes.ts';
import Inker from '../../components/inker/inker.tsx';

const Layout = () => {
	const navigate = useNavigate();
	return (
		<div className={styles.container}>
			<Inker />
			<Tabs defaultValue="account" className="w-[400px]">
				<TabsList className="grid w-full grid-cols-2">
					<TabsTrigger value="account">Login</TabsTrigger>
					<TabsTrigger value="password">Register</TabsTrigger>
				</TabsList>
				<TabsContent value="account">
					<Card>
						<CardHeader>
							<CardDescription>
								Login to your existing Ink account. Click on Register if you are
								a new user.
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-2">
							<div className="space-y-1">
								<Label htmlFor="name">Email</Label>
								<Input
									id="email"
									type="email"
									placeholder="johndoe@hotmail.co"
								/>
							</div>
							<div className="space-y-1">
								<Label htmlFor="username">Password</Label>
								<Input id="password" type="password" placeholder="@johndoe" />
							</div>
						</CardContent>
						<CardFooter>
							<Button onClick={() => navigate(ROUTES.DASHBOARD)}>Login</Button>
						</CardFooter>
					</Card>
				</TabsContent>
				<TabsContent value="password">
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
								/>
							</div>
							<div className="space-y-1">
								<Label htmlFor="new">Password</Label>
								<Input id="password" type="password" placeholder="@johndoe" />
							</div>
						</CardContent>
						<CardFooter>
							<Button onClick={() => navigate(ROUTES.DASHBOARD)}>
								Register
							</Button>
						</CardFooter>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
};

export default Layout;
