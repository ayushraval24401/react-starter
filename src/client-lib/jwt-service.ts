import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
	exp: number;
	permissions: string[];
	type: string;
	[key: string]: any; // Extendable for other properties that your token may include
}

export function hasPermissionFromToken(
	token: string,
	userPermissions: string[]
): boolean {
	const userData: DecodedToken = jwtDecode(token); // Type safety here
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

export function hasPermission(
	userData: DecodedToken | null,
	userPermissions: string[]
): boolean {
	if (!userData) {
		return false;
	}

	return userPermissions.some((permission) =>
		userData.permissions.includes(permission)
	);
}

export function hasRoleFromToken(token: string, roles: string[]): boolean {
	const userData: DecodedToken = jwtDecode(token);

	if (!userData) {
		return false;
	}

	const exp = (userData.exp || Date.now()) * 1000;

	return Date.now() <= exp && roles.some((role) => userData.type === role);
}

export function hasRoles(
	userData: DecodedToken | null,
	roles: string[]
): boolean {
	if (!userData) {
		return false;
	}

	return roles.some((role) => userData.type === role);
}

export function isExpired(token: string): boolean {
	const userData: DecodedToken = jwtDecode(token);
	if (!userData.exp) {
		return false;
	}
	const exp = userData.exp * 1000;
	return Date.now() > exp;
}

export function willExpire(token: string, inMinute = 1): boolean {
	try {
		const userData: DecodedToken = jwtDecode(token);
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

export function decodeToken(token: string): DecodedToken {
	return jwtDecode(token);
}
