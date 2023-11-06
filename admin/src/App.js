import { useState } from 'react';
import Topbar from './scenes/global/Topbar';
import Sidebar from './scenes/global/Sidebar';
import Contact from './scenes/contact';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { ColorModeContext, useMode } from './theme';
import About from './scenes/about';
import Projects from './scenes/projectPage';
import Skills from './scenes/skills';
import Experiences from './scenes/experiences';
import LoginPage from './scenes/loginPage';
import { getCookie } from './utils/cookieHelper';
import { Routes, Navigate, useNavigate, Route, Outlet } from 'react-router-dom';
import { AboutForm } from './scenes/forms';
import ExperienceForm from './scenes/forms/ExperienceForm';
import ProjectForm from './scenes/forms/projectForm.js';
import SkillForm from './scenes/forms/skillForm';

function App() {
	const [theme, colorMode] = useMode();
	const [isSidebar, setIsSidebar] = useState(true);

	const ProtectedRoute = ({ redirectPath = '/login', children }) => {
		let token = getCookie('token');
		const isAuthTokenValid = token ? true : false;
		// const isAuthTokenValid = isUserAuthenticated();
		// console.log({ isAuthTokenValid });

		return isAuthTokenValid ? (
			children ? (
				children
			) : (
				<Outlet />
			)
		) : (
			<Navigate to={redirectPath} replace />
		);
	};
	return (
		<ColorModeContext.Provider value={colorMode}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<div className='app'>
					<Sidebar isSidebar={isSidebar} />
					<main className='content'>
						<Topbar setIsSidebar={setIsSidebar} />
						<Routes>
							<Route
								path='/'
								element={
									<ProtectedRoute>
										<About />
									</ProtectedRoute>
								}
							/>
							<Route
								path='/about'
								element={
									<ProtectedRoute>
										<About />
									</ProtectedRoute>
								}
							/>
							<Route
								path='/project'
								element={
									<ProtectedRoute>
										<Projects />
									</ProtectedRoute>
								}
							/>
							<Route
								path='/skill'
								element={
									<ProtectedRoute>
										<Skills />
									</ProtectedRoute>
								}
							/>
							<Route
								path='/experience'
								element={
									<ProtectedRoute>
										<Experiences />
									</ProtectedRoute>
								}
							/>
							<Route
								path='/contact'
								element={
									<ProtectedRoute>
										<Contact />
									</ProtectedRoute>
								}
							/>
							<Route
								path='/about-form'
								element={
									<ProtectedRoute>
										<AboutForm />
									</ProtectedRoute>
								}
							/>
							<Route
								path='/update-about-form'
								element={
									<ProtectedRoute>
										<AboutForm />
									</ProtectedRoute>
								}
							/>
							<Route
								path='/experience-form'
								element={
									<ProtectedRoute>
										<ExperienceForm />
									</ProtectedRoute>
								}
							/>
							<Route
								path='/update-experience-form'
								element={
									<ProtectedRoute>
										<ExperienceForm />
									</ProtectedRoute>
								}
							/>
							<Route
								path='/project-form'
								element={
									<ProtectedRoute>
										<ProjectForm />
									</ProtectedRoute>
								}
							/>
							<Route
								path='/update-project-form'
								element={
									<ProtectedRoute>
										<ProjectForm />
									</ProtectedRoute>
								}
							/>
							<Route
								path='/skill-form'
								element={
									<ProtectedRoute>
										<SkillForm />
									</ProtectedRoute>
								}
							/>
							<Route
								path='/update-skill-form'
								element={
									<ProtectedRoute>
										<SkillForm />
									</ProtectedRoute>
								}
							/>
							<Route path='/login' element={<LoginPage />} />
						</Routes>
					</main>
				</div>
			</ThemeProvider>
		</ColorModeContext.Provider>
	);
}

export default App;
