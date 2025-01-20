import MainLayout from 'layouts/MainLayout';
import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
	hasPermissionFromToken,
	hasRoleFromToken,
	isExpired,
} from '../../client-lib/jwt-service';

interface Auth {
	path: string;
	userRoles: [string];
	permissions: [string];
}

// Define your roles and paths with permissions
const authorizedPaths: Auth[] = [];

const unAuthorizedPaths = ['/login', '/forgot-password', '/reset-password'];

export default function SecurityConfiguration() {
	const navigate = useNavigate();
	const [isAuthorized, setAuthorized] = useState(false);
	const location = useLocation();
	const authorizedPath = authorizedPaths.find((authPath) =>
		new RegExp(authPath.path).test(location.pathname)
	);
	const isOnAuthorizedPath =
		authorizedPath &&
		!unAuthorizedPaths.some((authPath) =>
			new RegExp(authPath).test(location.pathname)
		);

	useEffect(() => {
		localStorage.setItem(
			'isOnAuthorizedPath',
			!!isOnAuthorizedPath ? 'true' : 'false'
		);
		if (isOnAuthorizedPath) {
			const token = localStorage.getItem('token');

			let _isAuthorized = false;

			if (token) {
				_isAuthorized = !isExpired(token); // Check if token is expired
				if (authorizedPath.userRoles) {
					_isAuthorized = hasRoleFromToken(
						token,
						authorizedPath.userRoles
					); // Check user role from token
				}
				if (authorizedPath.permissions) {
					_isAuthorized = hasPermissionFromToken(
						token,
						authorizedPath.permissions
					); // Check user permissions from token
				}
			}

			if (_isAuthorized) {
				setAuthorized(_isAuthorized);
			} else {
				navigate(
					`/login?next=${encodeURIComponent(location.pathname)}`
				); // Redirect to login if not authorized
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isOnAuthorizedPath, location, isAuthorized, authorizedPath]);

	if (!isOnAuthorizedPath || isAuthorized) {
		return (
			<>
				{/* {isOnAuthorizedPath ? ( */}
				<MainLayout>
					<Outlet />
				</MainLayout>
				{/* ) : (
					<Outlet />
				)} */}
			</>
		);
	}

	return <span>Authenticating...</span>;
}
