import React from 'react';
import { useRoutes } from 'react-router-dom';

const Routes: React.FC = () => {
	// Use combined app routes
	return useRoutes(appRoutes);
};

export default Routes;
