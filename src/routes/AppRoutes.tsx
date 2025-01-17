import React from 'react';
import { RouteObject } from 'react-router-dom';
import publicRoutes from './PublicRoute';
import privateRoutes from './PrivateRoute';

const appRoutes: RouteObject[] = [
	...publicRoutes, // Publicly accessible routes (e.g., login, signup)
	...privateRoutes, // Routes that require authentication (e.g., dashboard, settings)
];

export default appRoutes;
