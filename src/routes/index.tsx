import SecurityConfiguration from 'components/Security/security-configuration';
import { SettingsProvider } from 'context/SettingsContext';
import MainLayout from 'layouts/MainLayout';
import SettingLayout from 'layouts/SettingsLayout';
import LoginPage from 'pages/Auth/Login';
import EmployeePage from 'pages/Employee/Employee';
import Home from 'pages/Home';
import Users from 'pages/Users';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
	{
		element: (
			<SettingsProvider>
				<SecurityConfiguration />
			</SettingsProvider>
		),
		children: [
			{
				path: '/',
				element: <MainLayout />,
				children: [
					{
						index: true,
						element: <Home />,
					},
					{
						path: '/employee',
						element: <EmployeePage />,
					},
				],
			},
			{
				path: '/settings',
				element: <SettingLayout />,
				children: [
					{
						path: '/settings/users',
						element: <Users />,
					},
				],
			},
		],
	},
	{
		path: '/login',
		element: <LoginPage />,
	},
]);

export default router;
