import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Spinner from './components/Loaders/Spinner.js'; // Adjusted import path
import ProtectRoute from './utils/ProtectedRoute.js';

// Lazily imported components
const LoginPage = lazy(() => import('./pages/login.page.js'));
const RegisterPage = lazy(() => import('./pages/register.page.js'));
const DashboardPage = lazy(() => import('./pages/dashboard.page.js'));
const AboutPage = lazy(() => import('./pages/about.page.js'));
const ExperiencePage = lazy(() => import('./pages/experience.page.js'));
const ProjectPage = lazy(() => import('./pages/project.page.js'));
const SkillPage = lazy(() => import('./pages/skill.page.js'));

interface RouteConfig {
	path: string;
	element: React.ReactElement;
} // Removed comment for clarity

const AppRoutes = () => {
	const routes: RouteConfig[] = [
		{
			path: '*',
			element: <Navigate to='/login' replace />,
		},
		{
			path: '/login',
			element: (
				<ProtectRoute redirectPath={'/'} isCommon={false}>
					<LoginPage />
				</ProtectRoute>
			),
		},
		{
			path: '/Register',
			element: (
				<ProtectRoute redirectPath={'/'} isCommon={false}>
					<RegisterPage />
				</ProtectRoute>
			),
		},

		{
			path: '/',
			element: (
				<ProtectRoute>
					<DashboardPage />
				</ProtectRoute>
			),
		},
		{
			path: '/about',
			element: (
				<ProtectRoute>
					<AboutPage />
				</ProtectRoute>
			),
		},
		{
			path: '/experiences',
			element: (
				<ProtectRoute>
					<ExperiencePage />
				</ProtectRoute>
			),
		},
		{
			path: '/projects',
			element: (
				<ProtectRoute>
					<ProjectPage />
				</ProtectRoute>
			),
		},
		{
			path: '/skills',
			element: (
				<ProtectRoute>
					<SkillPage />
				</ProtectRoute>
			),
		},
	];

	return (
		<BrowserRouter>
			<Suspense fallback={<Spinner />}>
				<Routes>
					{routes.map((route) => (
						<Route key={route.path} {...route} />
					))}
				</Routes>
			</Suspense>
		</BrowserRouter>
	);
};

export default AppRoutes;
