import SecurityConfiguration from 'components/Security/security-configuration';
import LoginPage from 'pages/Auth/Login';
import Employee from 'pages/Employee';
import Home from 'pages/Home';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
	{
		element: <SecurityConfiguration />,
		children: [
			{
				path: '/',
				element: <Home />,
			},
			{
				path: '/employee',
				element: <Employee />,
			},
		],
	},
	{
		path: '/login',
		element: <LoginPage/>,
	},
]);

export default router;
