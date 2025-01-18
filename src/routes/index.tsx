import SecurityConfiguration from 'components/Security/security-configuration';
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
		],
	},
]);

export default router;
