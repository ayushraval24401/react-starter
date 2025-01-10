import React from 'react';
import { RouteObject } from 'react-router-dom';
import publicRoutes from './publicRoutes';
import privateRoutes from './privateRoutes';

const appRoutes: RouteObject[] = [
	...publicRoutes, // Publicly accessible routes (e.g., login, signup)
	...privateRoutes, // Routes that require authentication (e.g., dashboard, settings)
];

export default appRoutes;
