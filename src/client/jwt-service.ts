import { jwtDecode } from 'jwt-decode';

export function hasPermissionFromToken(
	token: string,
	userPermissions: string[]
) {
	const userData: any = jwtDecode(token);
	if (!userData) {
		return false;
	}
	const exp = (userData.exp || Date.now()) * 1000;

	return (
		Date.now() <= exp &&
		userPermissions.some((permission) =>
			userData.permissions.includes(permission)
		)
	);
}

export function hasPermission(userData: any, userPermissions: string[]) {
	if (!userData) {
		return false;
	}

	return userPermissions.some((permission) =>
		userData.permissions.includes(permission)
	);
}

export function hasRoleFromToken(token: string, roles: string[]) {
	const userData: any = jwtDecode(token);

	if (!userData) {
		return false;
	}

	const exp = (userData.exp || Date.now()) * 1000;

	return Date.now() <= exp && roles.some((role) => userData.type === role);
}

export function hasRoles(userData: any, roles: string[]) {
	if (!userData) {
		return false;
	}

	return roles.some((role) => userData.type === role);
}

export function isExpired(token: string) {
	const userData = jwtDecode(token);
	if (!userData.exp) {
		return false;
	}
	const exp = userData.exp * 1000;
	return Date.now() > exp;
}

export function willExpire(token: string, inMinute = 1) {
	try {
		const userData = jwtDecode(token);
		if (!userData.exp) {
			return false;
		}
		const exp = userData.exp * 1000;
		const date = new Date();
		date.setMinutes(date.getMinutes() + inMinute);
		return date.getTime() > exp;
	} catch (error) {
		// eslint-disable-next-line no-console
		console.log(error);
		return false;
	}
}

export function decodeToken(token: string) {
	return jwtDecode(token);
}
