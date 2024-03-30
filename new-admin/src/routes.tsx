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
	redirectPath?: string;
	isAllowed?: boolean;
	isCommon?: boolean;
} // Removed comment for clarity

const AppRoutes = () => {
	const routes: RouteConfig[] = [
		{
			path: '*',
			element: <Navigate to='/login' replace />,
			isAllowed: true,
		},
		{ path: '/login', element: <LoginPage />, isCommon: false },
		{ path: '/Register', element: <RegisterPage />, isCommon: false },

		{ path: '/dashboard', element: <DashboardPage /> },
		{ path: '/about', element: <AboutPage /> },
		{ path: '/experiences', element: <ExperiencePage /> },
		{ path: '/projects', element: <ProjectPage /> },
		{ path: '/skills', element: <SkillPage /> },
	];

	return (
		<BrowserRouter>
			<Suspense fallback={<Spinner />}>
				<Routes>
					{routes.map((route) => (
						<ProtectRoute
							redirectPath={route.redirectPath}
							isAllowed={route.isAllowed}
							isCommon={route.isCommon}
						>
							<Route key={route.path} {...route} />
						</ProtectRoute>
					))}
				</Routes>
			</Suspense>
		</BrowserRouter>
	);
};

export default AppRoutes;
