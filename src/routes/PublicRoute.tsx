import React from 'react';
import { RouteObject } from 'react-router-dom';
import Login from 'pages/Auth/Login';
import Register from 'pages/Auth/Register';
import ForgotPassword from 'pages/Auth/ForgotPassword';

const publicRoutes: RouteObject[] = [
	{
		path: '/login',
		element: <Login />,
	},
	{
		path: '/register',
		element: <Register />,
	},
	{
		path: '/forgot-password',
		element: <ForgotPassword />,
	},
];

export default publicRoutes;
